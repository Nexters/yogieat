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
				"ygi:flex ygi:gap-space-2 ygi:items-center ygi:px-space-24",
				// Typography
				"ygi:font-suit-bold ygi:text-body-l ygi:text-palette-text-interactive",
				"ygi:tracking-tight ygi:leading-none",
				className,
			)}
		>
			<span>{currentStep}</span>
			<span>/</span>
			<span>{totalSteps}</span>
		</div>
	);
};
