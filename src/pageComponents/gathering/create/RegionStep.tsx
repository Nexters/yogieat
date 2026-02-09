"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { isNil } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button/Button";
import { DotsLoader } from "#/components/dotsLoader";
import { REGION_OPTIONS } from "#/constants/gathering/opinion";
import { RegionChip } from "./RegionChip";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

export const RegionStepContent = () => {
	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepIndicator currentStep={3} totalSteps={3} />
				<h1 className="ygi:heading-22-bd ygi:text-text-primary">
					장소를 선택해 주세요
				</h1>
				<div className="ygi:flex ygi:gap-3">
					{REGION_OPTIONS.map(({ value, label }) => (
						<RegionChip key={value} value={value} label={label} />
					))}
				</div>
			</div>
		</section>
	);
};

interface RegionStepFooterProps {
	isPending: boolean;
}

export const RegionStepFooter = ({ isPending }: RegionStepFooterProps) => {
	const { control, getValues } = useFormContext<CreateMeetingFormSchema>();
	const isValid = useWatch({
		control,
		name: "region",
		compute: (region) => !isNil(region),
	});

	const handleClick = () => {
		const region = getValues("region");
		const regionLabel = REGION_OPTIONS.find(
			(r) => r.value === region,
		)?.label ?? "-";
		trackStepComplete({
			page_id: "모임생성_퍼널",
			step_name: "장소",
			step_value: regionLabel,
		});
	};

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					type="submit"
					variant="primary"
					width="full"
					disabled={!isValid || isPending}
					onClick={handleClick}
				>
					{isPending ? <DotsLoader /> : "완료"}
				</Button>
			</div>
		</Layout.Footer>
	);
};
