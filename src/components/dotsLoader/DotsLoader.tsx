import { cva } from "class-variance-authority";
import { twJoin } from "tailwind-merge";

const dotsLoaderVariants = cva(
	[
		"ygi:inline-flex",
		"ygi:items-center",
		"ygi:justify-center",
		"ygi:gap-1",
		"ygi:animate-dotsLoaderBounce",
	],
	{
		variants: {
			size: {
				small: "ygi:h-5",
				medium: "ygi:h-9",
			},
		},
		defaultVariants: {
			size: "medium",
		},
	},
);

const dotVariants = cva(
	["ygi:rounded-full", "ygi:bg-current", "ygi:opacity-80"],
	{
		variants: {
			size: {
				small: "ygi:h-1.5 ygi:w-1.5",
				medium: "ygi:h-2 ygi:w-2",
			},
		},
		defaultVariants: {
			size: "medium",
		},
	},
);

export interface DotsLoaderProps {
	size?: "small" | "medium";
}

export const DotsLoader = ({ size = "medium" }: DotsLoaderProps) => {
	return (
		<span
			className={twJoin(dotsLoaderVariants({ size }))}
			role="status"
			aria-label="Loading"
		>
			{[0, 1, 2].map((index) => (
				<span
					key={index}
					className={twJoin(dotVariants({ size }))}
					style={{
						animation: "dotsLoaderBounce 1.2s ease-in-out infinite",
						animationDelay: `${index * 0.15}s`,
					}}
				/>
			))}
		</span>
	);
};
