import type { ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";
import { motion } from "motion/react";

export interface ProgressBarProps extends Omit<
	ComponentPropsWithoutRef<"div">,
	"className"
> {
	value: number;
}

export const ProgressBar = ({ value, ...props }: ProgressBarProps) => {
	const clampedValue = Math.min(Math.max(value, 0), 100);

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
		</div>
	);
};
