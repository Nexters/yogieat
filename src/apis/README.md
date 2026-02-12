# API 레이어 가이드

이 디렉토리는 백엔드 API와 통신하는 모든 로직을 포함합니다.

## 디렉토리 구조

각 API 도메인은 다음 파일들로 구성됩니다:

```
apis/[domain]/
├── api.ts              # 실제 API 호출 함수
├── type.ts             # 요청/응답 타입 정의
├── queryKey.ts         # Query Key Factory
├── queryOptions.ts     # Query Options (GET 요청)
├── mutationOptions.ts  # Mutation Options (POST/PUT/DELETE)
└── index.ts            # 공개 API (필요한 것만 export)
```

## 새 API 도메인 추가하기

### 1. 디렉토리 생성
```bash
mkdir src/apis/[domain-name]
```

### 2. `type.ts` - 타입 정의
```typescript
// 요청 타입
export type Create[Domain]Request = {
  name: string;
  // ...
};

// 응답 타입
export type [Domain]Response = {
  id: string;
  name: string;
  createdAt: string;
  // ...
};

export type Get[Domain]Response = [Domain]Response;
export type Create[Domain]Response = [Domain]Response;
```

### 3. `api.ts` - API 함수
```typescript
import { apiClient, type ApiResponse } from "#/utils/api";
import type {
  Create[Domain]Request,
  Create[Domain]Response,
  Get[Domain]Response,
} from "./type";

export const create[Domain] = async (
  request: Create[Domain]Request
): Promise<ApiResponse<Create[Domain]Response>> => {
  return apiClient.post("/[domains]", request);
};

export const get[Domain] = async (
  id: string
): Promise<ApiResponse<Get[Domain]Response>> => {
  return apiClient.get(`/[domains]/${id}`);
};

export const update[Domain] = async (
  id: string,
  request: Partial<Create[Domain]Request>
): Promise<ApiResponse<[Domain]Response>> => {
  return apiClient.patch(`/[domains]/${id}`, request);
};

export const delete[Domain] = async (id: string): Promise<ApiResponse<void>> => {
  return apiClient.delete(`/[domains]/${id}`);
};
```

### 4. `queryKey.ts` - Query Key Factory
```typescript
export const [domain]Keys = {
  all: ["[domain]"] as const,
  lists: () => [...[domain]Keys.all, "list"] as const,
  list: (filters: string) => [...[domain]Keys.lists(), { filters }] as const,
  details: () => [...[domain]Keys.all, "detail"] as const,
  detail: (id: string) => [...[domain]Keys.details(), id] as const,
};
```

**Key 네이밍 규칙**:
- `all`: 도메인 전체 무효화 시
- `lists()`: 목록 쿼리들
- `list(filters)`: 필터가 적용된 특정 목록
- `details()`: 상세 쿼리들
- `detail(id)`: 특정 항목 상세

### 5. `queryOptions.ts` - Query Options (GET)
```typescript
import { queryOptions } from "@tanstack/react-query";
import { get[Domain] } from "./api";
import { [domain]Keys } from "./queryKey";

export const [domain]QueryOptions = {
  detail: (id: string) =>
    queryOptions({
      queryKey: [domain]Keys.detail(id),
      queryFn: () => get[Domain](id),
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 30,   // 30분
    }),
};
```

**staleTime 설정 가이드**:
- 자주 변경되는 데이터: `1000 * 60` (1분)
- 일반 데이터: `1000 * 60 * 5` (5분)
- 거의 변경 안 되는 데이터: `1000 * 60 * 30` (30분)

### 6. `mutationOptions.ts` - Mutation Options (POST/PUT/DELETE)
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create[Domain], delete[Domain] } from "./api";
import { [domain]Keys } from "./queryKey";
import type { Create[Domain]Request } from "./type";

export const use Create[Domain] = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: Create[Domain]Request) => create[Domain](request),
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [domain]Keys.all,
      });
    },
  });
};

export const useDelete[Domain] = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => delete[Domain](id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [domain]Keys.all,
      });
    },
  });
};
```

### 7. `index.ts` - 공개 API
```typescript
// API 함수들 (hooks에서 사용)
export * from "./api";

// 타입들 (컴포넌트에서 사용)
export type * from "./type";

// Query Key (테스트나 수동 무효화 시)
export { [domain]Keys } from "./queryKey";

// Query Options (hooks에서 사용)
export { [domain]QueryOptions } from "./queryOptions";

// Mutation Hooks (컴포넌트에서 직접 사용)
export { useCreate[Domain], useDelete[Domain] } from "./mutationOptions";
```

### 8. `src/hooks/apis/[domain]/` - 커스텀 훅 생성

```typescript
// src/hooks/apis/[domain]/useGet[Domain].ts
import { useSuspenseQuery } from "@tanstack/react-query";
import { [domain]QueryOptions } from "#/apis/[domain]";

export const useGet[Domain] = (id: string) => {
  return useSuspenseQuery({
    ...[domain]QueryOptions.detail(id),
    select: (response) => response.data,
  });
};
```

## 체크리스트

새 API 도메인 추가 시 확인:

- [ ] `type.ts`: Request/Response 타입 정의
- [ ] `api.ts`: apiClient 사용하여 API 함수 작성
- [ ] `queryKey.ts`: 계층적 Query Key Factory 작성
- [ ] `queryOptions.ts`: GET 요청용 Query Options 작성
- [ ] `mutationOptions.ts`: POST/PUT/DELETE용 Mutation 작성 + 무효화 로직
- [ ] `index.ts`: 필요한 것만 export
- [ ] `src/hooks/apis/[domain]/`: useSuspenseQuery 래핑 훅 작성
- [ ] 에러 처리: `isApiError`로 타입 가드 적용

## 중요 규칙

### ✅ DO
- API 함수는 `apiClient`만 사용 (ky 직접 사용 금지)
- 모든 Response는 `ApiResponse<T>` 타입 사용
- Query Key는 계층적 구조 유지
- Mutation 성공 시 관련 쿼리 무효화
- `useSuspenseQuery` 사용 (Suspense 경계와 함께)

### ❌ DON'T
- API 로직을 컴포넌트에 직접 작성하지 말 것
- Query Key를 하드코딩하지 말 것
- Mutation에서 낙관적 업데이트 과도하게 사용하지 말 것 (복잡도 증가)
- `any` 타입 사용 금지

## 예시: 기존 도메인 참고

- `apis/gathering/` - 모임 API (가장 완전한 예시)
- `apis/participant/` - 참여자 API
- `apis/recommendResult/` - 추천 결과 API

## 에러 처리

```typescript
import { isApiError } from "#/utils/api/errors";
import { toast } from "#/utils/toast";

try {
  const response = await create[Domain](data);
  toast.success("생성되었습니다.");
} catch (error) {
  if (isApiError(error)) {
    toast.error(error.message);
  } else {
    toast.error("알 수 없는 오류가 발생했습니다.");
  }
}
```

## 참고 자료

- [TanStack Query 문서](https://tanstack.com/query/latest)
- [Ky 문서](https://github.com/sindresorhus/ky)
