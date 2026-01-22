import type { ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";

export interface DescriptionProps extends Omit<
	ComponentPropsWithoutRef<"p">,
	"className" | "children"
> {
	children: string;
}

export const Description = ({ children, ...props }: DescriptionProps) => {
	return (
		<p
			className={twJoin(
				"ygi:body-16-md ygi:text-text-secondary",
				"ygi:leading-normal ygi:tracking-tight",
				"ygi:w-full",
			)}
			{...props}
		>
			{children}
		</p>
	);
};
