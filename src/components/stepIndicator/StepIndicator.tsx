import { twJoin } from "tailwind-merge";

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

export const StepIndicator = ({
	currentStep,
	totalSteps,
}: StepIndicatorProps) => {
	return (
		<div
			className={twJoin(
				"ygi:gap-0.5 ygi:px-space-24 ygi:flex ygi:items-center",
				"ygi:body-16-bd ygi:text-text-interactive",
			)}
		>
			<span>{currentStep}</span>
			<span>/</span>
			<span>{totalSteps}</span>
		</div>
	);
};
