import type { ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";
import { HeartIcon } from "#/icons/heartIcon";
import { motion, AnimatePresence } from "motion/react";

export interface ProgressBarProps extends Omit<
	ComponentPropsWithoutRef<"div">,
	"className"
> {
	value: number;
}

export const ProgressBar = ({ value, ...props }: ProgressBarProps) => {
	const clampedValue = Math.min(Math.max(value, 0), 100);
	const showIndicator = clampedValue > 0;

	return (
		<div
			className={twJoin(
				"ygi:relative ygi:h-3 ygi:w-full ygi:overflow-visible ygi:rounded-sm ygi:bg-surface-gray",
			)}
			role="progressbar"
			aria-valuenow={clampedValue}
			aria-valuemin={0}
			aria-valuemax={100}
			{...props}
		>
			<motion.div
				className="ygi:absolute ygi:top-0 ygi:left-0 ygi:h-full ygi:rounded-sm ygi:bg-button-secondary"
				initial={{ width: "0%" }}
				animate={{ width: `${clampedValue}%` }}
				transition={{
					duration: 0.3,
					ease: "easeOut",
				}}
			/>

			<AnimatePresence>
				{showIndicator && (
					<motion.div
						key="indicator"
						className={twJoin(
							"ygi:absolute ygi:top-1/2 ygi:flex ygi:h-7 ygi:w-7 ygi:-translate-y-1/2",
							"ygi:items-center ygi:justify-center ygi:rounded-full",
							"ygi:border ygi:border-icon-inverse ygi:bg-red-200",
						)}
						initial={{ opacity: 0, scale: 0.5, left: "-14px" }}
						animate={{
							opacity: 1,
							scale: 1,
							left: `calc(${clampedValue}% - 14px)`,
						}}
						exit={{ opacity: 0, scale: 0.5, left: "-14px" }}
						transition={{
							duration: 0.3,
							ease: "easeOut",
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
