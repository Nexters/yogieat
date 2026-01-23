import { twJoin } from "tailwind-merge";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
	className?: string;
}

export const StepIndicator = ({
	currentStep,
	totalSteps,
	className,
}: StepIndicatorProps) => {
	return (
		<div
			className={twJoin(
				// Layout
				"ygi:gap-space-2 ygi:px-space-24 ygi:flex ygi:items-center",
				// Typography
				"ygi:font-suit-bold ygi:text-body-l ygi:text-palette-text-interactive",
				"ygi:leading-none ygi:tracking-tight",
				className,
			)}
		>
			<span>{currentStep}</span>
			<span>/</span>
			<span>{totalSteps}</span>
		</div>
	);
};
