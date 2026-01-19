import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";
import { HeartIcon } from "#/components/heartIcon";
import { motion, AnimatePresence } from "motion/react";

const containerVariants = cva([
	"ygi:relative ygi:w-full ygi:h-[12px]",
	"ygi:bg-palette-gray-200 ygi:rounded-sm",
	"ygi:overflow-visible",
]);

const fillVariants = cva([
	"ygi:absolute ygi:left-0 ygi:top-0 ygi:h-full",
	"ygi:bg-palette-primary-500 ygi:rounded-sm",
]);

const indicatorVariants = cva([
	"ygi:absolute ygi:top-1/2 ygi:-translate-y-1/2",
	"ygi:w-[28px] ygi:h-[28px]",
	"ygi:bg-palette-primary-500 ygi:rounded-full",
	"ygi:shadow-md",
	"ygi:flex ygi:items-center ygi:justify-center",
]);

export interface ProgressBarProps extends ComponentProps<"div"> {
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
			className={twJoin(containerVariants(), className)}
			role="progressbar"
			aria-valuenow={clampedValue}
			aria-valuemin={0}
			aria-valuemax={100}
			{...props}
		>
			<motion.div
				className={fillVariants()}
				initial={{ width: "0%" }}
				animate={{ width: `${clampedValue}%` }}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
			/>

			<AnimatePresence>
				{isValue && (
					<motion.div
						key="indicator"
						className={indicatorVariants()}
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{
							opacity: 1,
							scale: 1,
							left: `calc(${clampedValue}% - 14px)`,
						}}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{
							duration: 0.3,
							ease: "easeOut",
						}}
					>
						<HeartIcon size={16} color="white" />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
