import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { twJoin } from 'tailwind-merge';

const chipVariants = cva(
	[
		'ygi:inline-flex ygi:items-center ygi:justify-center',
		'ygi:text-center ygi:whitespace-nowrap',
		'ygi:rounded-xl ygi:px-xl ygi:py-sm',
		'ygi:transition-colors ygi:disabled:cursor-not-allowed',
	],
	{
		variants: {
			status: {
				default: [
					'ygi:bg-palette-gray-100 ygi:text-palette-gray-500',
					'ygi:hover:bg-palette-gray-200 ygi:hover:text-palette-gray-600',
					'ygi:disabled:bg-palette-gray-100 ygi:disabled:text-palette-gray-400',
				],
				selected: [
					'ygi:bg-palette-primary-500 ygi:text-palette-common-white',
					'ygi:hover:bg-palette-primary-700',
					'ygi:disabled:bg-palette-primary-200',
				],
			},
		},
		defaultVariants: {
			status: 'default',
		},
	},
);

export type ChipProps = ComponentProps<'button'> &
	VariantProps<typeof chipVariants> & {
		asChild?: boolean;
	};

export const Chip = ({
	status = 'default',
	disabled = false,
	children,
	asChild = false,
	className,
	ref,
	...props
}: ChipProps) => {
	const Component = asChild ? Slot : 'button';
	const ariaPressed = status === 'selected';

	return (
		<Component
			ref={ref}
			disabled={disabled}
			aria-pressed={ariaPressed}
			aria-disabled={disabled}
			className={twJoin(
				chipVariants({
					status,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
};
