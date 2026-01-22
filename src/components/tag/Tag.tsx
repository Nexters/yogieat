import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const tagVariants = cva(
	[
		'ygi:inline-flex ygi:items-center ygi:justify-center',
		'ygi:bg-surface-primary ygi:text-text-interactive',
		'ygi:caption-12-sb ygi:whitespace-nowrap',
	],
	{
		variants: {
			size: {
				medium: ['ygi:px-2 ygi:py-1', 'ygi:rounded-sm'],
				small: ['ygi:px-1 ygi:py-0 ygi:h-4', 'ygi:rounded-xs'],
			},
		},
		defaultVariants: {
			size: 'medium',
		},
	},
);

export type TagProps = Omit<ComponentProps<'span'>, 'children' | 'className'> &
	VariantProps<typeof tagVariants> & {
		children: string;
	};

export const Tag = ({ size = 'medium', children, ...props }: TagProps) => {
	return (
		<span className={tagVariants({ size })} {...props}>
			{children}
		</span>
	);
};
