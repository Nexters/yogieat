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
			variant: {
				filled: "",
				dashed: [
					"ygi:outline-[3px] ygi:outline-offset-[-3px] ygi:outline-border-default ygi:outline-dashed",
					"ygi:bg-transparent ygi:text-text-disabled",
					"ygi:hover:bg-transparent ygi:hover:text-text-disabled",
					"ygi:disabled:bg-transparent ygi:disabled:text-text-disabled",
					"ygi:disabled:hover:bg-transparent ygi:disabled:hover:text-text-disabled",
				],
			},
			selected: {
				false: "",
				true: "",
			},
		},
		compoundVariants: [
			{
				variant: "filled",
				selected: false,
				class: [
					"ygi:bg-button-tertiary ygi:text-text-secondary",
					"ygi:hover:bg-button-tertiary-hover ygi:hover:text-text-primary",
					"ygi:disabled:bg-button-tertiary-disabled ygi:disabled:text-text-disabled",
					"ygi:disabled:hover:bg-button-tertiary-disabled ygi:disabled:hover:text-text-disabled",
				],
			},
			{
				variant: "filled",
				selected: true,
				class: [
					"ygi:bg-button-secondary ygi:text-text-inverse",
					"ygi:hover:bg-button-secondary-hover",
					"ygi:disabled:bg-button-secondary-disabled ygi:disabled:text-text-inverse",
					"ygi:disabled:hover:bg-button-secondary-disabled",
				],
			},
		],
		defaultVariants: {
			variant: "filled",
			selected: false,
		},
	},
);

export type ChipProps = Omit<ComponentProps<"button">, "className"> &
	VariantProps<typeof chipVariants>;

export const Chip = ({
	ref,
	type = "button",
	variant,
	selected,
	children,
	disabled,
	...props
}: ChipProps) => {
	return (
		<button
			ref={ref}
			type={type}
			aria-pressed={selected ?? false}
			disabled={disabled}
			className={chipVariants({ selected, variant })}
			{...props}
		>
			{children}
		</button>
	);
};
