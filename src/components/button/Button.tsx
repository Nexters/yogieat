import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { twJoin } from 'tailwind-merge';

const buttonVariants = cva(
	[
		'ygi:inline-flex ygi:items-center ygi:justify-center',
		'ygi:text-center ygi:whitespace-nowrap',
		'ygi:rounded-md ygi:px-xl ygi:py-sm',
		'ygi:cursor-pointer ygi:transition-colors',
		'ygi:disabled:cursor-not-allowed ygi:disabled:opacity-50',
		'ygi:heading-18-bd',
	],
	{
		variants: {
			color: {
				primary: [
					'ygi:bg-palette-gray-800 ygi:text-palette-common-white',
					'ygi:hover:bg-palette-gray-900',
					'ygi:disabled:hover:bg-palette-gray-800',
				],
				secondary: [
					'ygi:bg-palette-gray-200 ygi:text-palette-gray-800',
					'ygi:hover:bg-palette-gray-300',
					'ygi:disabled:hover:bg-palette-gray-200',
				],
				tertiary: [
					'ygi:bg-palette-primary-500 ygi:text-palette-common-white',
					'ygi:hover:bg-palette-primary-700',
					'ygi:disabled:hover:bg-palette-primary-500',
				],
			},
		},
		defaultVariants: {
			color: 'primary',
		},
	},
);

export type ButtonProps = ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

export const Button = ({
	color = 'primary',
	disabled = false,
	children,
	asChild = false,
	className,
	ref,
	...props
}: ButtonProps) => {
	const Component = asChild ? Slot : 'button';

	return (
		<Component
			ref={ref}
			disabled={disabled}
			aria-disabled={disabled}
			className={twJoin(
				buttonVariants({
					color,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
};
