import { twJoin } from "tailwind-merge";

interface DotIndicatorProps {
	total: number;
	current: number;
}

export const DotIndicator = ({ total, current }: DotIndicatorProps) => {
	return (
		<div
			aria-hidden="true"
			className="ygi:flex ygi:items-center ygi:justify-center ygi:gap-1.5"
		>
			{Array.from({ length: total }, (_, i) => (
				<span
					key={i}
					className={twJoin(
						"ygi:h-1.5 ygi:w-1.5 ygi:rounded-full ygi:transition-colors",
						i === current
							? "ygi:bg-surface-dark"
							: "ygi:bg-palette-gray-300",
					)}
				/>
			))}
		</div>
	);
};
