import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const tagVariants = cva(
	[
		"ygi:inline-flex ygi:items-center ygi:justify-center",
		"ygi:caption-12-sb ygi:whitespace-nowrap",
	],
	{
		variants: {
			theme: {
				primary: ["ygi:bg-surface-primary ygi:text-text-interactive"],
				secondary: ["ygi:bg-surface-gray ygi:text-text-secondary"],
			},
			size: {
				medium: ["ygi:px-2 ygi:py-1", "ygi:rounded-sm"],
				small: ["ygi:h-4 ygi:px-1 ygi:py-0", "ygi:rounded-xs"],
			},
		},
		defaultVariants: {
			size: "medium",
			theme: "primary",
		},
	},
);

export type TagProps = Omit<ComponentProps<"span">, "children" | "className"> &
	VariantProps<typeof tagVariants> & {
		children: string;
	};

export const Tag = ({
	size = "medium",
	theme = "primary",
	children,
	...props
}: TagProps) => {
	return (
		<span className={tagVariants({ size, theme })} {...props}>
			{children}
		</span>
	);
};
