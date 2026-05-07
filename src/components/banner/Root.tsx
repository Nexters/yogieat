import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type RootProps<E extends ElementType = "div"> = {
	as?: E;
	children: ReactNode;
	className?: string;
} & Omit<ComponentPropsWithoutRef<E>, "as" | "children" | "className">;

const baseClassName =
	"ygi:flex ygi:w-full ygi:items-center ygi:justify-between ygi:rounded-sm ygi:px-4 ygi:py-3 ygi:bg-surface-secondary";

export const Root = <E extends ElementType = "div">({
	as,
	children,
	className,
	...props
}: RootProps<E>) => {
	const Slot = (as ?? "div") as ElementType;

	return (
		<Slot className={twMerge(baseClassName, className)} {...props}>
			{children}
		</Slot>
	);
};
