import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const chipVariants = cva(
	[
		"ygi:inline-flex ygi:items-center ygi:justify-center",
		"ygi:px-md ygi:py-xs",
		"ygi:rounded-xl ygi:transition-colors",
		"ygi:text-center ygi:body-16-bd ygi:whitespace-nowrap",
		"ygi:cursor-pointer ygi:disabled:cursor-not-allowed",
	],
	{
		variants: {
			selected: {
				false: [
					"ygi:bg-palette-gray-100 ygi:text-palette-gray-500",
					"ygi:hover:bg-palette-gray-200 ygi:hover:text-palette-gray-600",
					"ygi:disabled:bg-palette-gray-100 ygi:disabled:text-palette-gray-400",
				],
				true: [
					"ygi:bg-palette-primary-500 ygi:text-palette-common-white",
					"ygi:hover:bg-palette-primary-700",
					"ygi:disabled:bg-palette-primary-200",
				],
			},
		},
		defaultVariants: {
			selected: false,
		},
	},
);

export type ChipProps = ComponentProps<"button"> &
	VariantProps<typeof chipVariants>;

export const Chip = ({ selected, children, disabled, ...props }: ChipProps) => {
	return (
		<button
			aria-pressed={selected ?? false}
			disabled={disabled}
			className={chipVariants({ selected })}
			{...props}
		>
			{children}
		</button>
	);
};
