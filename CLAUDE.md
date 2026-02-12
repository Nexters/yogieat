# YogiEat (요기잇) 프로젝트 가이드

## 프로젝트 개요

**YogiEat**은 다인원 모임에서 함께 먹을 맛집을 추천해주는 서비스입니다.

- 모임을 생성하고 참여자들의 의견을 수합하여 최적의 맛집을 추천
- Next.js App Router 기반의 모던 웹 애플리케이션
- TypeScript, React Query, Tailwind CSS v4 사용

## 기술 스택

### Core

- **Framework**: Next.js 16.1.1 (App Router)
- **Runtime**: React 19.2.3
- **Language**: TypeScript 5 (strict mode)
- **Package Manager**: pnpm

### Data & State

- **Server State**: TanStack React Query 5.90.16
- **Form**: React Hook Form 7.71.0 + Zod 4.3.6
- **HTTP Client**: Ky 1.14.2

### Styling

- **CSS Framework**: Tailwind CSS v4 (PostCSS 기반)
- **Style Utilities**: CVA (Class Variance Authority), tailwind-merge
- **Prefix**: `ygi:` (모든 Tailwind 클래스에 필수)

### Infrastructure

- **Container**: Docker (Multi-stage build)
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub

## 프로젝트 구조

```
yogieat/
├── app/                        # Next.js App Router 페이지
│   ├── gathering/              # 모임 관련 페이지
│   │   ├── create/             # 모임 생성
│   │   └── [accessKey]/        # 동적 라우트 (landing, opinion 등)
│   └── layout.tsx, page.tsx
│
├── src/
│   ├── apis/                   # API 레이어
│   │   ├── gathering/
│   │   │   ├── api.ts          # API 함수
│   │   │   ├── type.ts         # 요청/응답 타입
│   │   │   ├── queryKey.ts     # Query Key Factory
│   │   │   ├── queryOptions.ts # Query Options
│   │   │   └── mutationOptions.ts
│   │   ├── participant/
│   │   └── recommendResult/
│   │
│   ├── components/             # 재사용 가능한 기본 컴포넌트
│   ├── pageComponents/         # 페이지 레벨 컴포넌트
│   ├── hooks/
│   │   ├── apis/               # API 훅 (useSuspenseQuery 래퍼)
│   │   └── gathering/          # 비즈니스 로직 훅
│   ├── schemas/                # Zod 검증 스키마
│   ├── types/                  # TypeScript 타입
│   ├── utils/
│   │   └── api/                # API 클라이언트 및 에러 처리
│   ├── styles/                 # 디자인 토큰 (CSS Variables)
│   ├── icons/                  # 커스텀 SVG 아이콘
│   └── providers/              # React Providers
│
├── docker/                     # Docker 설정
│   ├── client/
│   └── nginx/
├── .github/workflows/          # CI/CD 워크플로우
└── public/                     # 정적 자산
```

## 코딩 컨벤션

### 1. 절대 경로 Import

```typescript
// ✅ Good
import { Button } from '#/components/button';
import { useGetGathering } from '#/hooks/apis/gathering';

// ❌ Bad
import { Button } from '../../components/button';
```

### 2. Tailwind CSS 프리픽스 필수

```typescript
// ✅ Good
<div className="ygi:flex ygi:items-center ygi:gap-4">

// ❌ Bad - 스타일 적용 안 됨
<div className="flex items-center gap-4">
```

### 3. 컴포넌트 작성 규칙

```typescript
// 클라이언트 상호작용이 필요한 경우만 "use client" 사용
"use client";

import { type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

// CVA로 변형(variant) 정의
const buttonVariants = cva(["ygi:base-styles"], {
  variants: {
    variant: {
      primary: ["ygi:bg-primary"],
      secondary: ["ygi:bg-secondary"]
    }
  },
  defaultVariants: { variant: "primary" }
});

// Props 타입 정의
type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, className })}
      {...props}
    />
  );
}
```

### 4. 네이밍 규칙

- **컴포넌트**: PascalCase (`Button.tsx`, `OpinionFormView.tsx`)
- **훅**: camelCase with `use` prefix (`useGetGathering.ts`)
- **타입**: PascalCase (`CreateMeetingRequest`, `GatheringResponse`)
- **유틸리티**: camelCase (`formatDate`, `shareUrl`)
- **상수**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)

## API 패턴

### API 모듈 구조

각 API 도메인은 다음 파일들로 구성:

```
apis/gathering/
├── api.ts              # 실제 API 호출 함수
├── type.ts             # 요청/응답 타입
├── queryKey.ts         # Query Key Factory
├── queryOptions.ts     # Query Options
├── mutationOptions.ts  # Mutation Options
└── index.ts            # 공개 API
```

### Query Key Factory 패턴

```typescript
// queryKey.ts
export const gatheringKeys = {
  all: ["gathering"] as const,
  create: () => [...gatheringKeys.all, "create"] as const,
  detail: (accessKey: string) =>
    [...gatheringKeys.all, accessKey, "detail"] as const,
};
```

### API 함수 작성

```typescript
// api.ts
export const createGathering = async (
  request: CreateGatheringRequest
): Promise<ApiResponse<CreateGatheringResponse>> => {
  return apiClient.post("/gatherings", request);
};
```

### Query Options

```typescript
// queryOptions.ts
export const gatheringQueryOptions = {
  detail: (accessKey: string) =>
    queryOptions({
      queryKey: gatheringKeys.detail(accessKey),
      queryFn: () => getGathering(accessKey),
      staleTime: 1000 * 60 * 5, // 5분
    }),
};
```

### 훅 사용

```typescript
// hooks/apis/gathering/useGetGathering.ts
export const useGetGathering = (accessKey: string) => {
  return useSuspenseQuery({
    ...gatheringQueryOptions.detail(accessKey),
    select: (response) => response.data,
  });
};

// 컴포넌트에서 사용
function GatheringDetail({ accessKey }: Props) {
  const gathering = useGetGathering(accessKey); // Suspense 경계 필요
  // ...
}
```

## 폼 처리 패턴

### 1. Zod 스키마 정의

```typescript
// schemas/gathering/createMeetingForm.schema.ts
import { z } from "zod";

export const createMeetingFormSchema = z.object({
  meetingName: z.string()
    .min(1, "모임 이름을 입력해주세요")
    .max(50, "50자 이내로 입력해주세요"),
  participants: z.number()
    .min(2, "최소 2명 이상이어야 합니다"),
  // ...
});

export type CreateMeetingFormSchema = z.infer<typeof createMeetingFormSchema>;
```

### 2. React Hook Form 사용

```typescript
// hooks/gathering/useCreateMeetingForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateMeetingForm = () => {
  const methods = useForm<CreateMeetingFormSchema>({
    mode: "onChange", // 실시간 검증
    resolver: zodResolver(createMeetingFormSchema),
    defaultValues: {
      meetingName: "",
      participants: 2,
    },
  });

  return methods;
};
```

### 3. Funnel 패턴 (다단계 폼)

```typescript
// hooks/gathering/useCreateMeetingFunnel.ts
export const useCreateMeetingFunnel = () => {
  const [step, setStep] = useState(0);
  const steps = ["기본정보", "장소선택", "날짜선택", "확인"];

  const next = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep(prev => Math.max(prev - 1, 0));

  return { step, steps, next, prev };
};
```

## 스타일링 가이드

### 디자인 토큰 사용

```css
/* src/styles/color.css */
:root {
	--color-primary: #ff6b35;
	--color-surface-primary: #ffffff;
	--color-text-primary: #1a1a1a;
}
```

```typescript
// Tailwind 클래스로 사용 (ygi: 프리픽스 필수!)
<div className="ygi:bg-primary ygi:text-white">
```

### CVA를 사용한 변형 관리

```typescript
const chipVariants = cva(["ygi:inline-flex", "ygi:items-center"], {
  variants: {
    size: {
      sm: ["ygi:px-2", "ygi:py-1", "ygi:text-sm"],
      md: ["ygi:px-3", "ygi:py-2", "ygi:text-base"],
      lg: ["ygi:px-4", "ygi:py-3", "ygi:text-lg"],
    },
    variant: {
      filled: ["ygi:bg-primary", "ygi:text-white"],
      outlined: ["ygi:border", "ygi:border-primary"],
    },
  },
  defaultVariants: {
    size: "md",
    variant: "filled",
  },
});
```

### 반응형 디자인

```typescript
// 모바일 우선 접근
<div className="ygi:px-4 md:ygi:px-8 lg:ygi:px-16">
```

## 에러 처리

### API 에러 처리

```typescript
import { ApiError, isApiError } from '#/utils/api/errors';

try {
  const response = await createGathering(data);
} catch (error) {
  if (isApiError(error)) {
    console.error('API Error:', error.code, error.message);
    toast.error(error.message);
  } else {
    console.error('Unknown Error:', error);
    toast.error('알 수 없는 오류가 발생했습니다.');
  }
}
```

### Toast 알림

```typescript
import { toast } from '#/utils/toast';

// 성공
toast.success('모임이 생성되었습니다.');

// 에러
toast.error('모임 생성에 실패했습니다.');

// 정보
toast.info('참여자가 추가되었습니다.');
```

## 환경 변수

### 공개 환경 변수 (클라이언트 번들 포함)

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://dev-api.yogieat.com
NEXT_PUBLIC_AWS_S3=https://yogieat-statics.s3.ap-southeast-2.amazonaws.com
NEXT_PUBLIC_GTM_ID=GTM-M3SWGCR8
```

### 사용 방법

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

⚠️ **주의**: `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트 번들에 포함되므로 민감한 정보 금지!

## 배포 및 CI/CD

### 브랜치 전략

- `main` - 프로덕션 환경
- `develop` - 개발 환경
- `hotfix/*` - 긴급 패치
- `feature/*` - 기능 개발

### 자동 배포

```
Push to main → Code Quality Check → Docker Build → Deploy → Health Check → Discord Notification
```

### 수동 배포

GitHub Actions에서 `workflow_dispatch` 트리거 사용:

- `deploy_client`: 클라이언트 배포 여부
- `deploy_nginx`: Nginx 배포 여부
- `force_rebuild`: 캐시 무시 여부

### Health Check

- 배포 후 80초 대기
- 10초 간격으로 상태 확인
- `start_period` 고려한 로직

## 중요 주의사항

### 1. 🚨 Tailwind 프리픽스 필수

```typescript
// ❌ 절대 하지 마세요 - 스타일 적용 안 됨
<div className="flex items-center gap-4">

// ✅ 항상 ygi: 프리픽스 사용
<div className="ygi:flex ygi:items-center ygi:gap-4">
```

### 2. 🔒 React Query Retry 설정

```typescript
// QueryClient 기본 설정: retry: 0
// 실패 시 재시도하지 않음 (빠른 에러 피드백)
```

### 3. 📦 Docker Build

- `output: 'standalone'` 설정 (Next.js)
- 멀티스테이지 빌드로 최소 크기 이미지
- Non-root 사용자로 실행 (nextjs:1001)

### 4. 🎯 useSuspenseQuery 사용

```typescript
// Suspense 경계와 함께 사용 필요
<Suspense fallback={<Loading />}>
  <ComponentUsingSuspenseQuery />
</Suspense>
```

### 5. 🔐 보안

- XSS 방지: 사용자 입력 검증 (Zod)
- CORS: API 서버에서 처리
- CSP: 필요시 추가 설정

### 6. 📱 Next.js Image Optimization

```typescript
import Image from 'next/image';

// remotePatterns 설정된 도메인만 사용 가능
// - *.pstatic.net (Naver)
// - *.daumcdn.net (Daum)
// - *.kakaocdn.net (Kakao)
```

### 7. 🎨 디자인 시스템

- 디자인 토큰 우선 사용 (`--color-*`, `--spacing-*`)
- 임의의 값 사용 지양 (예: `ygi:px-[13px]`)
- CVA로 일관된 변형 관리

### 8. ⚡ 성능 최적화

- 불필요한 "use client" 지양 (RSC 활용)
- Dynamic import로 코드 스플리팅
- React.memo 남용 금지 (실제 성능 측정 후 적용)

### 9. 🧪 타입 안전성

- TypeScript strict mode 활성화
- `any` 타입 사용 금지
- Zod로 런타임 검증 보장

### 10. 🔄 캐시 전략

- React Query: `staleTime` 설정으로 불필요한 요청 방지
- Next.js: 기본 캐싱 전략 활용
- Docker: 빌드 캐시 최적화

## 유용한 명령어

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 린트 검사
pnpm lint

# 포맷팅
pnpm format

# 타입 체크
pnpm type-check

# Docker 로컬 실행
docker-compose -f docker-compose.local.yml up --build

# Docker 로그 확인
docker-compose logs -f client
```

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)
- [Zod 문서](https://zod.dev)
- [CVA 문서](https://cva.style)
