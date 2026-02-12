# 컴포넌트 가이드

이 디렉토리는 재사용 가능한 기본 컴포넌트들을 포함합니다.

## 컴포넌트 분류

### 1. 기본 컴포넌트 (`src/components/`)
- 재사용 가능한 UI 요소
- 비즈니스 로직 없음
- Props 중심의 제어형(Controlled) 컴포넌트
- 예: Button, Checkbox, Chip, InputField

### 2. 페이지 컴포넌트 (`src/pageComponents/`)
- 특정 페이지/도메인에 종속적
- 비즈니스 로직 포함 가능
- 여러 기본 컴포넌트 조합
- 예: OpinionFormView, RestaurantCard

## 새 컴포넌트 추가하기

### 디렉토리 구조
```
components/[componentName]/
├── [ComponentName].tsx     # 메인 컴포넌트
├── [ComponentName].css     # (선택) 커스텀 스타일이 필요한 경우
└── index.ts                # export
```

### 기본 템플릿

```typescript
"use client"; // 클라이언트 상호작용이 필요한 경우만

import { type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#/utils/cn"; // tailwind-merge 래퍼

// 1. CVA로 변형(variant) 정의
const componentVariants = cva(
  [
    // 기본 스타일 (항상 적용)
    "ygi:inline-flex",
    "ygi:items-center",
    "ygi:justify-center",
    "ygi:transition-colors",
  ],
  {
    variants: {
      variant: {
        primary: [
          "ygi:bg-primary",
          "ygi:text-white",
          "hover:ygi:bg-primary-hover",
        ],
        secondary: [
          "ygi:bg-secondary",
          "ygi:text-gray-900",
          "hover:ygi:bg-secondary-hover",
        ],
        outline: [
          "ygi:border",
          "ygi:border-gray-300",
          "ygi:bg-transparent",
          "hover:ygi:bg-gray-50",
        ],
      },
      size: {
        sm: ["ygi:px-3", "ygi:py-1.5", "ygi:text-sm"],
        md: ["ygi:px-4", "ygi:py-2", "ygi:text-base"],
        lg: ["ygi:px-6", "ygi:py-3", "ygi:text-lg"],
      },
      disabled: {
        true: ["ygi:opacity-50", "ygi:cursor-not-allowed"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// 2. Props 타입 정의
type ComponentNameProps = Omit<ComponentProps<"button">, "disabled"> &
  VariantProps<typeof componentVariants> & {
    // 추가 Props
    loading?: boolean;
    icon?: React.ReactNode;
  };

// 3. 컴포넌트 구현
export function ComponentName({
  variant,
  size,
  disabled,
  loading,
  icon,
  className,
  children,
  ...props
}: ComponentNameProps) {
  return (
    <button
      className={cn(
        componentVariants({ variant, size, disabled: disabled || loading }),
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {icon && <span className="ygi:mr-2">{icon}</span>}
      {children}
    </button>
  );
}
```

### index.ts
```typescript
export { ComponentName } from "./ComponentName";
export type { ComponentNameProps } from "./ComponentName";
```

## CVA 변형(Variant) 작성 가이드

### 1. 기본 원칙
- 배열로 클래스 그룹화 (가독성)
- 모든 클래스에 `ygi:` 프리픽스 필수
- 상태별로 변형 분리 (variant, size, state 등)

### 2. 자주 사용하는 변형 패턴

```typescript
const variants = cva([...], {
  variants: {
    // 시각적 스타일
    variant: {
      primary: [...],
      secondary: [...],
      outline: [...],
      ghost: [...],
    },

    // 크기
    size: {
      xs: [...],
      sm: [...],
      md: [...],
      lg: [...],
      xl: [...],
    },

    // 너비
    width: {
      full: ["ygi:w-full"],
      fit: ["ygi:w-fit"],
      auto: ["ygi:w-auto"],
    },

    // 상태
    disabled: {
      true: ["ygi:opacity-50", "ygi:cursor-not-allowed"],
    },

    // 모양
    rounded: {
      none: ["ygi:rounded-none"],
      sm: ["ygi:rounded-sm"],
      md: ["ygi:rounded-md"],
      lg: ["ygi:rounded-lg"],
      full: ["ygi:rounded-full"],
    },
  },

  // 변형 조합 처리
  compoundVariants: [
    {
      variant: "outline",
      disabled: true,
      className: ["ygi:border-gray-200"],
    },
  ],

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### 3. Compound Variants (조합)
```typescript
compoundVariants: [
  {
    variant: "primary",
    size: "sm",
    className: ["ygi:font-medium"], // primary + sm일 때만
  },
  {
    variant: ["outline", "ghost"], // 여러 variant에 동시 적용
    disabled: true,
    className: ["ygi:bg-gray-50"],
  },
],
```

## 스타일링 규칙

### ✅ DO
```typescript
// ygi: 프리픽스 필수
"ygi:flex ygi:items-center ygi:gap-4"

// 디자인 토큰 사용
"ygi:bg-primary ygi:text-white"

// 반응형 (모바일 우선)
"ygi:px-4 md:ygi:px-8 lg:ygi:px-16"

// 상태별 스타일
"hover:ygi:bg-gray-100 focus:ygi:ring-2 disabled:ygi:opacity-50"

// cn() 유틸로 클래스 병합
className={cn(baseClasses, className)}
```

### ❌ DON'T
```typescript
// 프리픽스 없음
"flex items-center" // ❌ 스타일 적용 안 됨

// 임의의 값 (디자인 토큰 사용 권장)
"ygi:px-[13px]" // ❌ 가능하면 토큰 사용

// 인라인 스타일 (특별한 이유 없으면)
style={{ padding: '13px' }} // ❌

// 하드코딩된 색상
"ygi:text-[#FF6B35]" // ❌ ygi:text-primary 사용
```

## 접근성 (a11y) 체크리스트

### 기본 요소
- [ ] `aria-label` 또는 시각적 텍스트 제공
- [ ] 키보드 내비게이션 지원 (Tab, Enter, Space)
- [ ] 포커스 스타일 명확히 표시
- [ ] 적절한 시맨틱 태그 사용 (`button`, `input`, `label` 등)

### 인터랙티브 요소
```typescript
// Button
<button
  type="button" // 명시적 타입
  aria-label="닫기"
  aria-disabled={disabled}
>

// Input
<input
  id="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && <span id="email-error" role="alert">{error}</span>}

// Checkbox
<input
  type="checkbox"
  id="agree"
  aria-checked={checked}
/>
<label htmlFor="agree">동의합니다</label>
```

### 동적 콘텐츠
```typescript
// 로딩 상태
<div role="status" aria-live="polite">
  {loading && "로딩 중..."}
</div>

// 에러 메시지
<div role="alert" aria-live="assertive">
  {error}
</div>
```

## "use client" 사용 기준

### 필요한 경우
```typescript
"use client";

// 1. 상태 관리
const [count, setCount] = useState(0);

// 2. 이벤트 핸들러
const handleClick = () => { /* ... */ };

// 3. 브라우저 API
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// 4. 컨텍스트 사용
const theme = useContext(ThemeContext);
```

### 불필요한 경우 (RSC로 유지)
```typescript
// 1. 순수 표시용 컴포넌트
export function DisplayCard({ title, description }: Props) {
  return <div>...</div>;
}

// 2. 서버 데이터만 렌더링
export function UserList({ users }: Props) {
  return users.map(user => <UserCard key={user.id} {...user} />);
}
```

## 컴포넌트 체크리스트

새 컴포넌트 추가 시 확인:

- [ ] CVA로 변형 정의
- [ ] Props 타입 명확히 정의 (`ComponentProps` 확장)
- [ ] `ygi:` 프리픽스 모든 클래스에 적용
- [ ] `cn()` 유틸로 className 병합
- [ ] 접근성 속성 추가 (aria-*, role)
- [ ] 키보드 내비게이션 지원
- [ ] "use client" 필요 여부 판단
- [ ] index.ts에서 export
- [ ] TypeScript strict mode 에러 없음

## 기존 컴포넌트 참고

### 기본 UI 요소
- `button/Button.tsx` - CVA 패턴의 완벽한 예시
- `chip/Chip.tsx` - 작은 인라인 요소
- `checkbox/Checkbox.tsx` - 폼 요소

### 복합 컴포넌트
- `inputField/InputField.tsx` - label + input + error 조합
- `stepIndicator/StepIndicator.tsx` - 다단계 진행 표시

### 레이아웃
- `layout/` - 페이지 구조 컴포넌트

## 성능 최적화 팁

### 1. 조건부 렌더링
```typescript
// ✅ Good - 불필요한 컴포넌트 생성 방지
{isOpen && <Modal />}

// ❌ Bad - 항상 컴포넌트 생성
<Modal isOpen={isOpen} />
```

### 2. React.memo 사용
```typescript
// 복잡한 컴포넌트이고 props가 자주 안 바뀌는 경우만
export const HeavyComponent = memo(function HeavyComponent({ data }: Props) {
  // 복잡한 렌더링 로직
});
```

### 3. useMemo, useCallback
```typescript
// 비싼 연산만 메모이제이션
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.value - b.value);
}, [items]);

// 자식 컴포넌트에 전달하는 함수
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

**주의**: 과도한 최적화는 오히려 성능 저하. 실제 측정 후 적용!

## 참고 자료

- [CVA 문서](https://cva.style)
- [React 접근성](https://react.dev/learn/accessibility)
- [ARIA 가이드](https://www.w3.org/WAI/ARIA/apg/)
