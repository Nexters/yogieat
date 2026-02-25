"use client";

import { useFormContext, useWatch, useController } from "react-hook-form";
import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { Chip } from "#/components/chip";
import {
	DISTANCE_OPTIONS,
	OPINION_TOTAL_STEPS,
	REGION_OPTIONS,
} from "#/constants/gathering/opinion";
import {
	distanceRangeSchema,
	type OpinionFormSchema,
} from "#/schemas/gathering";
import type { GetGatheringResponse } from "#/apis/gathering";

interface HeaderProps {
	region: GetGatheringResponse["region"];
}

const Header = ({ region }: HeaderProps) => {
	const stationName =
		REGION_OPTIONS.find((currentRegion) => currentRegion.value === region)
			?.label ?? "";

	return (
		<>
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
		</>
	);
};

const Content = () => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { field } = useController({ name: "distanceRange", control });

	return (
		<div className="ygi:flex ygi:gap-3">
			{DISTANCE_OPTIONS.map((option) => (
				<Chip
					key={option.value}
					selected={field.value === option.value}
					onClick={() => {
						field.onChange(option.value);
					}}
				>
					{option.label}
				</Chip>
			))}
		</div>
	);
};

interface FooterProps {
	onNext: () => void;
}

const Footer = ({ onNext }: FooterProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { distanceRange, disabled } = useWatch({
		control,
		name: "distanceRange",
		compute: (distanceRange) => ({
			distanceRange,
			disabled: !distanceRangeSchema.safeParse(distanceRange).success,
		}),
	});

	const handleNext = () => {
		const distanceLabel =
			DISTANCE_OPTIONS.find((d) => d.value === distanceRange)?.label ??
			"";
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

export const DistanceStep = {
	Header,
	Content,
	Footer,
};
