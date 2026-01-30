"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button/Button";
import { DislikedFoodButton } from "./DislikedFoodButton";
import {
	FOOD_CATEGORIES,
	OPINION_TOTAL_STEPS,
} from "#/constants/gathering/opinion";
import type { DislikeStepProps } from "#/types/gathering";
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
						후보에서 무조건 제외할 수 있어요.
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

export const DislikeStepFooter = ({
	onNext,
}: Pick<DislikeStepProps, "onNext">) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const disabled = useWatch({
		control,
		name: "dislikedFoods",
		compute: (value) => !value || value.length === 0,
	});

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={disabled}
					onClick={onNext}
				>
					다음
				</Button>
			</div>
		</Layout.Footer>
	);
};
