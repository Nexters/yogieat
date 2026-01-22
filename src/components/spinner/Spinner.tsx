import { cva } from "class-variance-authority";
import type { SVGProps } from "react";
import { twJoin } from "tailwind-merge";

const spinnerVariants = cva(
	["ygi:inline-block", "ygi:animate-spin", "ygi:stroke-primary-disabled"],
	{
		variants: {
			size: {
				small: "ygi:h-5 ygi:w-5",
				medium: "ygi:h-9 ygi:w-9",
				large: "ygi:h-13 ygi:w-13",
			},
		},
		defaultVariants: {
			size: "medium",
		},
	},
);

export interface SpinnerProps extends Omit<
	SVGProps<SVGSVGElement>,
	"children" | "className"
> {
	size?: "small" | "medium" | "large";
}

export const Spinner = ({ size = "medium", ...props }: SpinnerProps) => {
	return (
		<svg
			{...props}
			viewBox="0 0 50 50"
			className={twJoin(spinnerVariants({ size }))}
			role="status"
			aria-label="Loading"
		>
			<circle
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="4"
				className="ygi:stroke-surface-white"
			/>
			<circle
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="4"
				strokeDasharray="40 200"
				strokeLinecap="round"
				className="ygi:stroke-button-secondary-disabled"
			/>
		</svg>
	);
};
