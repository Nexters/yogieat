"use client";

import { isNil } from "es-toolkit";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { trackStepComplete } from "#/components/analytics";
import { Banner } from "#/components/banner";
import { Button } from "#/components/button/Button";
import { Dialog } from "#/components/dialog";
import { DotsLoader } from "#/components/dotsLoader";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { StepIndicator } from "#/components/stepIndicator";
import { Tab } from "#/components/tab";
import { useGetRegions, useGetRegionsByProvince } from "#/hooks/apis/region";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

import { RegionChip } from "./RegionChip";
import { RegionRequestDialog } from "./RegionRequestDialog";

export const RegionStepContent = () => {
	const { data: regionsByProvince } = useGetRegionsByProvince();

	const availableProvinces = [...regionsByProvince.keys()];

	const [selectedProvince, setSelectedProvince] = useState<string>(
		availableProvinces[0] ?? "",
	);

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
				onChange={(v) => setSelectedProvince(v)}
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

	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
		<>
			<Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<div className="ygi:fixed ygi:bottom-layout-footer-height ygi:left-0 ygi:z-layout-footer ygi:flex ygi:w-full ygi:justify-center">
					<div className="ygi:w-full ygi:max-w-root-layout ygi:bg-bg-white ygi:px-6 ygi:pb-6">
						<Banner.Root
							as="button"
							className="ygi:cursor-pointer"
							onClick={() => setIsDialogOpen(true)}
						>
							<Banner.Text className="ygi:text-left">
								원하는 지역이 있다면 말씀해 주세요!
							</Banner.Text>
							<Banner.Chevron />
						</Banner.Root>
					</div>
				</div>
				<Dialog.Content
					open={isDialogOpen}
					title="원하는 지역을 입력해 주세요"
					description="원하는 지역 요청 다이얼로그"
				>
					<RegionRequestDialog
						onClose={() => setIsDialogOpen(false)}
					/>
				</Dialog.Content>
			</Dialog.Root>
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
		</>
	);
};
