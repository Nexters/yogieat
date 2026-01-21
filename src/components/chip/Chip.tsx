import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps } from "react";

const chipVariants = cva(
	[
		"ygi:inline-flex ygi:items-center ygi:justify-center",
		"ygi:px-4 ygi:py-2",
		"ygi:rounded-xl ygi:transition-colors",
		"ygi:text-center ygi:body-16-bd ygi:whitespace-nowrap",
		"ygi:cursor-pointer ygi:disabled:cursor-not-allowed",
	],
	{
		variants: {
			selected: {
				false: [
					"ygi:bg-button-tertiary ygi:text-text-secondary",
					"ygi:hover:bg-button-tertiary-hover ygi:hover:text-text-primary",
					"ygi:disabled:bg-button-tertiary-disabled ygi:disabled:text-text-disabled",
					"ygi:disabled:hover:bg-button-tertiary-disabled ygi:disabled:hover:text-text-disabled",
				],
				true: [
					"ygi:bg-button-primary ygi:text-text-inverse",
					"ygi:hover:bg-button-primary-hover",
					"ygi:disabled:bg-button-primary-disabled ygi:disabled:text-text-inverse",
					"ygi:disabled:hover:bg-button-primary-disabled",
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
