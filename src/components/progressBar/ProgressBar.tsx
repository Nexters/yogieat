import type { ComponentProps } from 'react';
import { twJoin } from 'tailwind-merge';
import { HeartIcon } from '#/components/heartIcon';
import { motion, AnimatePresence } from 'motion/react';

const containerClasses =
	'ygi:relative ygi:h-[12px] ygi:w-full ygi:rounded-sm ygi:bg-palette-gray-200 ygi:overflow-visible';

const fillClasses =
	'ygi:absolute ygi:top-0 ygi:left-0 ygi:h-full ygi:rounded-sm ygi:bg-palette-primary-500';

const indicatorClasses =
	'ygi:absolute ygi:top-1/2 ygi:-translate-y-1/2 ygi:h-[28px] ygi:w-[28px] ygi:rounded-full ygi:bg-palette-primary-200 ygi:flex ygi:items-center ygi:justify-center ygi:border ygi:border-palette-common-white';

export interface ProgressBarProps extends ComponentProps<'div'> {
	value: number; // 0-100
}

export const ProgressBar = ({
	value,
	className,
	...props
}: ProgressBarProps) => {
	const clampedValue = Math.min(Math.max(value, 0), 100);
	const isValue = clampedValue > 0;

	return (
		<div
			className={twJoin(containerClasses, className)}
			role="progressbar"
			aria-valuenow={clampedValue}
			aria-valuemin={0}
			aria-valuemax={100}
			{...props}
		>
			<motion.div
				className={fillClasses}
				initial={{ width: '0%' }}
				animate={{ width: `${clampedValue}%` }}
				transition={{
					duration: 0.3,
					ease: 'easeOut',
				}}
			/>

			<AnimatePresence>
				{isValue && (
					<motion.div
						key="indicator"
						className={indicatorClasses}
						initial={{ opacity: 0, scale: 0.5, left: '-14px' }}
						animate={{
							opacity: 1,
							scale: 1,
							left: `calc(${clampedValue}% - 14px)`,
						}}
						exit={{ opacity: 0, scale: 0.5, left: '-14px' }}
						transition={{
							duration: 0.3,
							ease: 'easeOut',
						}}
					>
						<HeartIcon
							size={16}
							className="ygi:text-palette-primary-600"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
