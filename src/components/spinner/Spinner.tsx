import { cva } from "class-variance-authority";
import type { SVGProps } from "react";
import { twJoin } from "tailwind-merge";

// Spinner sizes (using standard Tailwind spacing)
const spinnerSizes = {
	small: 20,
	medium: 32,
	large: 44,
} as const;

const spinnerVariants = cva(
	["ygi:inline-block", "ygi:animate-spin", "ygi:stroke-palette-primary-100"],
	{
		variants: {
			size: {
				small: "ygi:w-5 ygi:h-5",
				medium: "ygi:w-8 ygi:h-8",
				large: "ygi:w-11 ygi:h-11",
			},
		},
		defaultVariants: {
			size: "medium",
		},
	},
);

export interface SpinnerProps
	extends Omit<SVGProps<SVGSVGElement>, "children"> {
	size?: "small" | "medium" | "large";
}

export const Spinner = ({
	size = "medium",
	className,
	...props
}: SpinnerProps) => {
	const pixelSize = spinnerSizes[size];

	return (
		<svg
			width={pixelSize}
			height={pixelSize}
			viewBox="0 0 50 50"
			className={twJoin(spinnerVariants({ size }), className)}
			role="status"
			aria-label="Loading"
			{...props}
		>
			<circle
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="4"
				strokeDasharray="60 200"
				strokeLinecap="round"
			/>
		</svg>
	);
};
