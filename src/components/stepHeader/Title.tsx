import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";

export type TitleProps = ComponentProps<"h2">;

export const Title = ({ children, className, ref, ...props }: TitleProps) => {
	return (
		<h2
			ref={ref}
			className={twJoin(
				// Typography
				"ygi:font-suit-bold ygi:text-heading-l ygi:text-palette-text-primary",
				"ygi:tracking-tight ygi:leading-normal",
				// Layout
				"ygi:w-full",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
};
