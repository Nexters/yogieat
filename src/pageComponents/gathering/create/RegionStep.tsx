"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { isNil } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button/Button";
import { DotsLoader } from "#/components/dotsLoader";
import { REGION_LIST, REGION_LABEL } from "#/constants/gathering/opinion";
import { RegionChip } from "./RegionChip";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

export const RegionStepContent = () => {
	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepHeader.Root>
					<StepHeader.Title>장소를 선택해 주세요</StepHeader.Title>
					<StepHeader.Description>
						선택 가능한 장소는 계속해서 추가될 예정이에요
					</StepHeader.Description>
				</StepHeader.Root>
				<div className="ygi:flex ygi:flex-wrap ygi:gap-3">
					{REGION_LIST.map((region) => (
						<RegionChip
							key={region}
							value={region}
							label={REGION_LABEL[region]}
						/>
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
		const regionLabel = region ? REGION_LABEL[region] : "-";
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
