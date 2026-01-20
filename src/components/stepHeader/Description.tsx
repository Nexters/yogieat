import type { ComponentProps } from 'react';
import { twJoin } from 'tailwind-merge';

export type DescriptionProps = ComponentProps<"p">;

export const Description = ({ children, className, ref, ...props }: DescriptionProps) => {
	return (
		<p
			ref={ref}
			className={twJoin(
				'ygi:font-suit-medium ygi:text-body-l ygi:text-palette-text-secondary',
				'ygi:leading-normal ygi:tracking-tight',
				'ygi:w-full',
				className,
			)}
			{...props}
		>
			{children}
		</p>
	);
};
