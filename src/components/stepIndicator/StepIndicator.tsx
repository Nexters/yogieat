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
				"ygi:flex ygi:items-center ygi:gap-0.5",
				"ygi:body-16-bd ygi:text-text-interactive",
			)}
		>
			<span>{currentStep}</span>
			<span>/</span>
			<span>{totalSteps}</span>
		</div>
	);
};
