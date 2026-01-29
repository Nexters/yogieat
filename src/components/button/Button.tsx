import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
	[
		"ygi:inline-flex ygi:items-center ygi:justify-center",
		"ygi:text-center ygi:whitespace-nowrap",
		"ygi:h-14 ygi:px-6 ygi:py-3",
		"ygi:cursor-pointer ygi:transition-colors",
		"ygi:disabled:cursor-not-allowed",
		"ygi:heading-18-bd",
	],
	{
		variants: {
			variant: {
				primary: [
					"ygi:bg-button-primary ygi:text-text-inverse",
					"ygi:hover:bg-button-primary-hover",
					"ygi:disabled:bg-button-primary-disabled ygi:disabled:text-text-inverse",
					"ygi:disabled:hover:bg-button-primary-disabled",
				],
				secondary: [
					"ygi:bg-button-secondary ygi:text-text-inverse",
					"ygi:hover:bg-button-secondary-hover",
					"ygi:disabled:bg-button-secondary-disabled ygi:disabled:text-text-inverse",
					"ygi:disabled:hover:bg-button-secondary-disabled",
				],
				tertiary: [
					"ygi:bg-button-tertiary ygi:text-text-secondary",
					"ygi:hover:bg-button-tertiary-hover ygi:hover:text-text-primary",
					"ygi:disabled:bg-button-tertiary-disabled ygi:disabled:text-text-disabled",
					"ygi:disabled:hover:bg-button-tertiary-disabled ygi:disabled:hover:text-text-disabled",
				],
			},
			shape: {
				rounded: "ygi:rounded-md",
				pill: "ygi:rounded-full",
			},
			width: {
				full: "ygi:w-full",
				fit: "ygi:w-fit",
			},
		},
		defaultVariants: {
			variant: "primary",
			shape: "rounded",
			width: "fit",
		},
	},
);

export type ButtonProps = Omit<ComponentProps<"button">, "className"> &
	VariantProps<typeof buttonVariants>;

export const Button = ({
	variant = "primary",
	shape = "rounded",
	width = "fit",
	type = "button",
	disabled = false,
	children,
	ref,
	...props
}: ButtonProps) => {
	return (
		<button
			ref={ref}
			disabled={disabled}
			aria-disabled={disabled}
			className={twMerge(
				buttonVariants({
					variant,
					shape,
					width,
				}),
			)}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
};
