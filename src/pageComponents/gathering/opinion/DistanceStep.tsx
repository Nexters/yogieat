"use client";

import { useCallback } from "react";
import { useFormContext, useController } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { Chip } from "#/components/chip";
import { useDistanceStepValidation } from "#/hooks/gathering";
import {
	DISTANCE_OPTIONS,
	OPINION_TOTAL_STEPS,
} from "#/constants/gathering/opinion";
import type { OpinionForm, DistanceStepProps } from "#/types/gathering";

export const DistanceStepContent = ({
	meetingContext,
}: Pick<DistanceStepProps, "meetingContext">) => {
	const { control } = useFormContext<OpinionForm>();
	const { field } = useController({ name: "distanceRange", control });

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6 ygi:pt-3">
			<StepIndicator currentStep={1} totalSteps={OPINION_TOTAL_STEPS} />
			<StepHeader.Root>
				<StepHeader.Title>
					역에서 얼마나 먼 곳까지
					<br />
					괜찮으신지 선택해주세요
				</StepHeader.Title>
				<StepHeader.Description>
					{`${meetingContext.stationName} 기준으로 추천 범위를 정할게요`}
				</StepHeader.Description>
			</StepHeader.Root>
			<div className="ygi:flex ygi:gap-3">
				{DISTANCE_OPTIONS.map((option) => (
					<Chip
						key={option.value}
						selected={field.value === option.value}
						onClick={() => {
							field.onChange(
								field.value === option.value
									? undefined
									: option.value,
							);
						}}
					>
						{option.label}
					</Chip>
				))}
			</div>
		</div>
	);
};

export const DistanceStepFooter = ({
	onNext,
}: Pick<DistanceStepProps, "onNext">) => {
	const { control } = useFormContext<OpinionForm>();
	const isValid = useDistanceStepValidation(control);

	const handleNext = useCallback(() => {
		if (isValid) {
			onNext();
		}
	}, [isValid, onNext]);

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={!isValid}
					onClick={handleNext}
				>
					다음
				</Button>
			</div>
		</Layout.Footer>
	);
};
