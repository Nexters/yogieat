import type { ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";

export interface TitleProps extends Omit<
	ComponentPropsWithoutRef<"h2">,
	"className" | "children"
> {
	children: string;
}

export const Title = ({ children, ...props }: TitleProps) => {
	return (
		<h2
			className={twJoin(
				"ygi:heading-20-bd ygi:text-text-primary",
				"ygi:leading-normal ygi:tracking-tight",
				"ygi:w-full",
			)}
			{...props}
		>
			{children}
		</h2>
	);
};
