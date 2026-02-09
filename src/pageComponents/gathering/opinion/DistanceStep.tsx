"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { isUndefined } from "es-toolkit/predicate";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import {
	DISTANCE_OPTIONS,
	OPINION_TOTAL_STEPS,
	REGION_OPTIONS,
} from "#/constants/gathering/opinion";
import type { OpinionFormSchema } from "#/schemas/gathering";
import type { GetGatheringResponse } from "#/apis/gathering";
import { DistanceSelector } from "./DistanceSelector";

interface DistanceStepContentProps {
	region: GetGatheringResponse["region"];
}

export const DistanceStepContent = ({ region }: DistanceStepContentProps) => {
	const stationName =
		REGION_OPTIONS.find((currentRegion) => currentRegion.value === region)
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
	const { control, getValues } = useFormContext<OpinionFormSchema>();
	const disabled = useWatch({
		control,
		name: "distanceRange",
		compute: (value) => isUndefined(value),
	});

	const handleNext = () => {
		const distanceRange = getValues("distanceRange");
		const distanceLabel =
			DISTANCE_OPTIONS.find((d) => d.value === distanceRange)?.label ?? "";
		trackStepComplete({
			page_id: "의견수합_퍼널",
			step_name: "거리",
			step_value: distanceLabel,
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
