import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
	children: ReactNode;
	className?: string;
}

export const Text = ({ children, className }: TextProps) => {
	return (
		<span
			className={twMerge(
				"ygi:flex-1 ygi:body-14-sb ygi:text-palette-secondary-700",
				className,
			)}
		>
			{children}
		</span>
	);
};
