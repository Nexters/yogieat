"use client";

import { isNil } from "es-toolkit";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { trackStepComplete } from "#/components/analytics";
import { Button } from "#/components/button/Button";
import { DotsLoader } from "#/components/dotsLoader";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { StepIndicator } from "#/components/stepIndicator";
import { Tab } from "#/components/tab";
import { PROVINCES } from "#/constants/gathering/opinion/province";
import { useGetRegions, useGetRegionsByProvince } from "#/hooks/apis/region";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

import { RegionChip } from "./RegionChip";

export const RegionStepContent = () => {
	const { data: regionsByProvince } = useGetRegionsByProvince();

	const availableProvinces = PROVINCES.filter(
		(province) => (regionsByProvince.get(province)?.length ?? 0) > 0,
	);

	const [selectedProvince, setSelectedProvince] = useState<
		(typeof PROVINCES)[number]
	>(availableProvinces[0] ?? PROVINCES[0]);

	const filteredRegions = regionsByProvince.get(selectedProvince) ?? [];

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-xl ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepIndicator currentStep={3} totalSteps={3} />
				<StepHeader.Root>
					<StepHeader.Title>장소를 선택해 주세요</StepHeader.Title>
				</StepHeader.Root>
			</div>

			<Tab.Root
				value={selectedProvince}
				onChange={(v) =>
					setSelectedProvince(v as (typeof PROVINCES)[number])
				}
			>
				{availableProvinces.map((province) => (
					<Tab.Item key={province} value={province}>
						{province}
					</Tab.Item>
				))}
			</Tab.Root>

			<div className="ygi:flex ygi:flex-wrap ygi:gap-3 ygi:px-5">
				{filteredRegions.map(({ code, displayName }) => (
					<RegionChip key={code} value={code} label={displayName} />
				))}
			</div>
		</section>
	);
};

interface RegionStepFooterProps {
	isPending: boolean;
}

export const RegionStepFooter = ({ isPending }: RegionStepFooterProps) => {
	const { control, getValues } = useFormContext<CreateMeetingFormSchema>();
	const { data: regions } = useGetRegions();
	const isValid = useWatch({
		control,
		name: "region",
		compute: (region) => !isNil(region),
	});

	const handleClick = () => {
		const region = getValues("region");
		const regionLabel = (region && regions.get(region)) || "-";
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
