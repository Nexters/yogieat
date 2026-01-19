import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";
import { HeartIcon } from "#/components/heartIcon";

const containerVariants = cva([
	"ygi:relative ygi:w-full ygi:h-[12px]",
	"ygi:bg-palette-gray-200 ygi:rounded-sm",
	"ygi:overflow-visible",
]);

const fillVariants = cva([
	"ygi:absolute ygi:left-0 ygi:top-0 ygi:h-full",
	"ygi:bg-palette-primary-500 ygi:rounded-sm",
	"ygi:transition-all ygi:duration-300 ygi:ease-in-out",
]);

const indicatorVariants = cva([
	"ygi:absolute ygi:top-1/2 ygi:-translate-y-1/2",
	"ygi:w-[28px] ygi:h-[28px]",
	"ygi:bg-palette-primary-500 ygi:rounded-full",
	"ygi:transition-all ygi:duration-300 ygi:ease-in-out",
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
	// Clamp value between 0-100
	const clampedValue = Math.min(Math.max(value, 0), 100);

	return (
		<div
			className={twJoin(containerVariants(), className)}
			role="progressbar"
			aria-valuenow={clampedValue}
			aria-valuemin={0}
			aria-valuemax={100}
			{...props}
		>
			{/* Progress fill */}
			<div className={fillVariants()} style={{ width: `${clampedValue}%` }} />

			{/* Indicator at end of progress */}
			{clampedValue > 0 && (
				<div
					className={indicatorVariants()}
					style={{
						left: `calc(${clampedValue}% - 14px)`, // Center on progress end
					}}
				>
					<HeartIcon size={16} color="white" />
				</div>
			)}
		</div>
	);
};
