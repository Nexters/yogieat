import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";

export type RootProps = ComponentProps<"div">;

export const Root = ({ children, className, ref, ...props }: RootProps) => {
	return (
		<div
			ref={ref}
			className={twJoin(
				"ygi:flex ygi:flex-col ygi:gap-space-12 ygi:items-start ygi:px-space-24 ygi:w-full",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
