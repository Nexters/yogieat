import type { ComponentProps } from 'react';
import { twJoin } from 'tailwind-merge';
import { ArrowLeftIcon } from '#/components/arrowLeftIcon';

export type BackwardButtonProps = ComponentProps<'button'>;

export const BackwardButton = ({
	className,
	ref,
	...props
}: BackwardButtonProps) => {
	return (
		<button
			ref={ref}
			type="button"
			aria-label="뒤로 가기"
			className={twJoin(
				'ygi:flex ygi:items-center ygi:justify-center',
				'ygi:w-space-48 ygi:h-space-48 ygi:p-space-12',
				className,
			)}
			{...props}
		>
			<ArrowLeftIcon size={24} color="#6b7280" />
		</button>
	);
};
