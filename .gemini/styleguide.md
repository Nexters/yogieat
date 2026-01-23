# Code Style Guidelines & Review Checklist

This document outlines the code style guidelines and key points to check during code reviews for our project.
Our goal is to ensure code readability, maintainability, and adherence to team conventions.

# Review Style

- Avoid general feedback, summaries, explanations of changes, or praises.
- Provide specific, objective insights only, without making broad comments on system impact or questioning intentions.
- Write all comments in Korean (ko-KR).

---

# Code Style Guide

This section defines the coding conventions and best practices for the Yogieat project.

## Tech Stack Overview

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (prefix: `ygi`)
- **Component Variants**: class-variance-authority (CVA)
- **Form State**: react-hook-form
- **Server State**: @tanstack/react-query
- **Animation**: motion (Framer Motion)
- **HTTP Client**: ky
- **Formatter**: Prettier (tabs, 4 spaces)
- **Linter**: ESLint 9

---

## 1. Naming Conventions

### Folder Names

- Use **camelCase**
- Examples: `inputField`, `stepHeader`, `backwardButton`

### File Names

- **Components**: PascalCase (e.g., `Button.tsx`, `InputField.tsx`)
- **Utilities/Constants**: camelCase (e.g., `color.ts`, `queryKey.ts`)
- **CSS Files**: kebab-case (e.g., `typography.css`, `color.css`)
- **Icons**: PascalCase + Icon suffix (e.g., `HeartIcon.tsx`)

### Component Names

- Use **PascalCase**
- Examples: `Button`, `InputField`, `StepIndicator`

### Variable and Function Names

- Use **camelCase**
- Examples: `handleClick`, `isActive`, `userName`

---

## 2. Component Rules

### Function Style

- **All components must be written as Arrow Functions**
- Export with declaration

```typescript
// ✅ Good
export const Button = ({ children, ...props }: ButtonProps) => {
	return <button {...props}>{children}</button>;
};

// ❌ Bad
export function Button({ children, ...props }: ButtonProps) {
	return <button {...props}>{children}</button>;
}
```

### Props Type Definition

- Extend `ComponentProps` to inherit HTML attributes
- Omit `className` (use Tailwind Merge instead)
- Merge with CVA `VariantProps`

```typescript
export type ButtonProps = Omit<ComponentProps<"button">, "className"> &
	VariantProps<typeof buttonVariants>;
```

### Component Structure

Components should follow this structure order:

1. Import statements
2. CVA variants definition (Optional)
3. Props type definition
4. Component body

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";

const buttonVariants = cva(
	["ygi:inline-flex", "ygi:items-center"],
	{
		variants: {
			variant: {
				primary: "ygi:bg-button-primary ygi:text-text-inverse",
				secondary: "ygi:bg-button-secondary",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

export type ButtonProps = Omit<ComponentProps<"button">, "className"> &
	VariantProps<typeof buttonVariants>;

export const Button = ({ variant, children, ...props }: ButtonProps) => {
	return (
		<button
			className={twJoin(buttonVariants({ variant }))}
			{...props}
		>
			{children}
		</button>
	);
};
```

---

## 3. Import/Export Rules

### Absolute Paths Required

- Always use path alias `#/`
- Relative paths are prohibited (except for imports within the same folder)

```typescript
// ✅ Good
import { Button } from "#/components/button";
import { HeartIcon } from "#/icons/heartIcon";
import { colors } from "#/constants/color";

// ❌ Bad
import { Button } from "../../components/button";
```

### Export Pattern

- Each component folder must have an `index.ts` file
- Export types along with components

```typescript
// components/button/index.ts
export { Button, type ButtonProps } from "./Button";
```

### Compound Components

- Use namespace pattern
- Export as object

```typescript
// components/layout/index.ts
import { Root } from "./Root";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Content } from "./Content";

export const Layout = {
	Root,
	Header,
	Footer,
	Content,
};

// Usage
<Layout.Root>
	<Layout.Header>...</Layout.Header>
	<Layout.Content>...</Layout.Content>
	<Layout.Footer>...</Layout.Footer>
</Layout.Root>
```

---

## 4. TypeScript Rules

### Type Definition

- Prefer `type` over `interface` for Props definitions (but interface is acceptable when needed)
- Props suffix is required (e.g., `ButtonProps`)

```typescript
// ✅ Good
export type ButtonProps = {
	variant?: "primary" | "secondary";
	children: ReactNode;
};

// ❌ Bad
interface ButtonProperties {
	variant?: "primary" | "secondary";
	children: ReactNode;
}
```

### Type Imports

- Use type modifier for type-only imports

```typescript
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
```

### Const Assertion

- Use `as const` for constant objects

```typescript
export const colors = {
	primary: "#000000",
	secondary: "#FFFFFF",
} as const;

export type Colors = typeof colors;
```

### Generic Types

- Define generic types explicitly when needed

```typescript
export type ApiResponse<T> = {
	data: T;
	status: number;
	message: string;
};
```

---

## 5. Styling Rules (Tailwind CSS v4 + CVA)

### Prefix Usage

- **All Tailwind classes must have `ygi:` prefix**

```typescript
// ✅ Good
className="ygi:flex ygi:items-center ygi:gap-md"

// ❌ Bad
className="flex items-center gap-4"
```

### CVA Usage

- Use CVA for components with variants
- Always specify `defaultVariants`

```typescript
const buttonVariants = cva(
	[
		"ygi:inline-flex",
		"ygi:items-center",
		"ygi:justify-center",
		"ygi:transition-colors",
	],
	{
		variants: {
			variant: {
				primary: "ygi:bg-button-primary ygi:text-text-inverse",
				secondary: "ygi:bg-button-secondary ygi:text-text-primary",
			},
			shape: {
				rounded: "ygi:rounded-md",
				pill: "ygi:rounded-full",
			},
			width: {
				fit: "ygi:w-fit",
				full: "ygi:w-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			shape: "rounded",
			width: "fit",
		},
	}
);
```

### Class Merging

- Use `twJoin` for conditional classes
- Use `twMerge` for external className override

```typescript
// twJoin: Simple concatenation
className={twJoin("ygi:flex", isActive && "ygi:text-blue-500")}

// twMerge: Conflict resolution
className={twMerge(buttonVariants({ variant }), className)}
```

### Design Tokens

- Always use design tokens for spacing, color, and typography
- Avoid hard-coded values

```typescript
// ✅ Good
className="ygi:gap-md ygi:text-text-primary ygi:rounded-md"

// ❌ Bad
className="ygi:gap-4 ygi:text-gray-800 ygi:rounded-lg"
```

### Available Design Tokens

#### Colors

- **Text**: `text-primary`, `text-secondary`, `text-tertiary`, `text-inverse`
- **Button**: `button-primary`, `button-secondary`, `button-tertiary`
- **Background**: `bg-primary`, `bg-secondary`, `bg-tertiary`
- **Border**: `border-primary`, `border-secondary`, `border-tertiary`
- **Palette**: `palette-gray-{50-900}`, `palette-blue-{50-900}`, etc.

#### Typography

- **Display**: `display-28-bd`, `display-24-bd`, `display-22-bd`, `display-20-bd`
- **Heading**: `heading-18-bd`, `heading-16-bd`, `heading-14-bd`
- **Body**: `body-16-rg`, `body-16-md`, `body-14-rg`, `body-14-md`, `body-12-rg`, `body-12-md`
- **Caption**: `caption-11-rg`, `caption-11-md`, `caption-10-rg`, `caption-10-md`

---

## 6. Folder Structure

### Component Folder Structure

```
components/
├── button/
│   ├── Button.tsx
│   └── index.ts
├── inputField/              # Complex component
│   ├── Input.tsx
│   ├── HelperText.tsx
│   ├── InputField.tsx       # Composition
│   └── index.ts
└── layout/                  # Compound component
    ├── Root.tsx
    ├── Header.tsx
    ├── Footer.tsx
    ├── Content.tsx
    └── index.ts
```

### API Folder Structure

```
apis/
└── domain/
    ├── queryKey.ts          # React Query keys
    ├── queryOption.ts       # Query options
    └── type.ts              # API response types
```

### Icon Folder Structure

```
icons/
├── heartIcon/
│   ├── HeartIcon.tsx
│   └── index.ts
├── arrowLeftIcon/
│   ├── ArrowLeftIcon.tsx
│   └── index.ts
└── iconBase/
    ├── IconBase.tsx
    └── index.ts
```

### Hooks Folder Structure

```
hooks/
├── apis/                    # API-related hooks
│   ├── useUser.ts
│   └── useAuth.ts
└── index.ts
```

---

## 7. State Management

### Local State

- Use `useState` for simple UI state
- Use `useRef` for DOM references and mutable values

```typescript
const [isOpen, setIsOpen] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);
```

### Form State

- Use `react-hook-form` for form management

```typescript
import { useForm } from "react-hook-form";

const { register, handleSubmit, formState: { errors } } = useForm();
```

### Server State

- Use `@tanstack/react-query` for API calls
- Define query keys in `apis/domain/queryKey.ts`
- Define query options in `apis/domain/queryOption.ts`

```typescript
// apis/user/queryKey.ts
export const userKeys = {
	all: ["user"] as const,
	detail: (id: string) => [...userKeys.all, id] as const,
};

// apis/user/queryOption.ts
export const userQueryOptions = {
	detail: (id: string) => ({
		queryKey: userKeys.detail(id),
		queryFn: () => fetchUser(id),
	}),
};

// Usage in component
const { data } = useQuery(userQueryOptions.detail(userId));
```

---

## 8. Code Formatting (Prettier)

```json
{
	"useTabs": true,
	"tabWidth": 4,
	"trailingComma": "all",
	"singleQuote": false,
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

- Use **tabs** (4 spaces)
- Always add trailing commas
- Use **double quotes**
- Automatic Tailwind class sorting

## 9. Best Practices

### DO's ✅

- Use Arrow Functions for all components
- Use absolute paths with `#/` alias
- Use CVA for component variants
- Use design tokens for spacing/colors
- Add `ygi:` prefix to all Tailwind classes
- Export types along with components
- Use `type` for Props definitions
- Use `as const` for constant objects
- Keep components small and focused
- Write self-documenting code

### DON'Ts ❌

- Don't use function declarations for components
- Don't use relative paths for imports
- Don't hard-code spacing/color values
- Don't forget the `ygi:` prefix
- Don't use `interface` for Props
- Don't create deep component hierarchies
- Don't duplicate code (DRY principle)
- Don't commit without running linter/formatter

## 10. Accessibility

- Use semantic HTML elements
- Add proper ARIA labels when needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast
- Support reduced motion preferences
