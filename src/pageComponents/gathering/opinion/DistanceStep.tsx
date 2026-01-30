"use client";

import { useFormContext, useController } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { OPINION_TOTAL_STEPS, REGION_OPTIONS } from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";
import type { GetGatheringResponse } from "#/apis/gathering";
import { DistanceSelector } from "./DistanceSelector";

interface DistanceStepContentProps {
	region: GetGatheringResponse["region"];
}

export const DistanceStepContent = ({ region }: DistanceStepContentProps) => {
	// FIXME : Region 관련 ENUM 혹은 as const 상수화 필요 (타입 안정성 확보)
	const stationName =
		REGION_OPTIONS.find((currentRegion) => currentRegion.id === region)
			?.label ?? "";

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
					{`${stationName} 기준으로 추천 범위를 정할게요`}
				</StepHeader.Description>
			</StepHeader.Root>
			<DistanceSelector />
		</div>
	);
};

interface DistanceStepFooterProps {
	onNext: () => void;
}

export const DistanceStepFooter = ({ onNext }: DistanceStepFooterProps) => {
	const { control, formState } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "distanceRange", control });

	const isValid = !!field.value && !formState.errors.distanceRange;

	const handleNext = () => {
		if (isValid) {
			onNext();
		}
	};

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
