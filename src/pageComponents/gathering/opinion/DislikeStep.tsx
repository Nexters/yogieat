"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button/Button";
import { DislikedFoodButton } from "./DislikedFoodButton";
import {
	FOOD_CATEGORIES,
	OPINION_TOTAL_STEPS,
} from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";

export const DislikeStepContent = () => {
	return (
		<div className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepIndicator
					currentStep={2}
					totalSteps={OPINION_TOTAL_STEPS}
				/>
				<StepHeader.Root>
					<StepHeader.Title>
						안 먹고 싶은 음식을 골라주세요
					</StepHeader.Title>
					<StepHeader.Description>
						후보에서 무조건 제외할 수 있어요. (최대 2개)
					</StepHeader.Description>
				</StepHeader.Root>
			</div>

			<div className="ygi:flex ygi:flex-wrap ygi:justify-center ygi:gap-3 ygi:px-6 ygi:pt-6 ygi:pb-9">
				{FOOD_CATEGORIES.map((category) => (
					<DislikedFoodButton
						key={category.value}
						category={category.value}
					/>
				))}
			</div>
		</div>
	);
};

interface DislikeStepFooterProps {
	onNext: () => void;
}

export const DislikeStepFooter = ({ onNext }: DislikeStepFooterProps) => {
	const { control, getValues } = useFormContext<OpinionFormSchema>();
	const disabled = useWatch({
		control,
		name: "dislikedFoods",
		compute: (value) => !value || value.length === 0,
	});

	const handleNext = () => {
		const dislikedFoods = getValues("dislikedFoods") ?? [];
		const dislikedLabels = dislikedFoods
			.map((food) => FOOD_CATEGORIES.find((c) => c.value === food)?.label)
			.filter(Boolean)
			.join(", ");
		trackStepComplete({
			page_id: "의견수합_퍼널",
			step_name: "비선호음식",
			step_value: dislikedLabels,
		});
		onNext();
	};

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={disabled}
					onClick={handleNext}
				>
					다음
				</Button>
			</div>
		</Layout.Footer>
	);
};
