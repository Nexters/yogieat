"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button/Button";
import { Chip } from "#/components/chip";
import { Spinner } from "#/components/spinner";
import { useRegionStepValidation } from "#/hooks/gathering";
import { useCreateGathering } from "#/hooks/apis/gathering";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";
import type { CreateMeetingForm, Region } from "#/types/gathering";

const REGION_OPTIONS = [
	{ id: "HONGDAE" as const, label: "홍대입구역" },
	{ id: "GANGNAM" as const, label: "강남역" },
];

export const RegionStepContent = () => {
	const { control, setValue } = useFormContext<CreateMeetingForm>();

	const region = useWatch({ control, name: "region" });

	const handleRegionChange = (selectedRegion: Region) => {
		setValue(
			"region",
			selectedRegion === region ? undefined : selectedRegion,
			{
				shouldValidate: true,
			},
		);
	};

	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
				<StepIndicator currentStep={3} totalSteps={3} />
				<h1 className="ygi:heading-22-bd ygi:text-text-primary">
					장소를 선택해 주세요
				</h1>
				<div className="ygi:flex ygi:gap-3">
					{REGION_OPTIONS.map(({ id, label }) => (
						<Chip
							key={id}
							selected={region === id}
							onClick={() => handleRegionChange(id)}
						>
							{label}
						</Chip>
					))}
				</div>
			</div>
		</section>
	);
};

interface RegionStepFooterProps {
	onComplete: (accessKey: string) => void;
}

export const RegionStepFooter = ({ onComplete }: RegionStepFooterProps) => {
	const { control, getValues } = useFormContext<CreateMeetingForm>();
	const isValid = useRegionStepValidation(control);

	const { mutate: createGathering, isPending } = useCreateGathering();

	const handleComplete = () => {
		const formData = getValues();

		if (
			!formData.peopleCount ||
			!formData.region ||
			!formData.scheduledDate ||
			!formData.timeSlot
		) {
			return;
		}

		createGathering(
			{
				peopleCount: formData.peopleCount,
				region: formData.region,
				scheduledDate: formData.scheduledDate.replace(/\./g, "-"), // yyyy.mm.dd -> yyyy-mm-dd 형태로 변환
				timeSlot: formData.timeSlot,
			},
			{
				onSuccess: (response) => {
					onComplete(response.data.accessKey);
				},
				onError: (error) => {
					if (isApiError(error)) {
						toast.warning(error.message);
					}
				},
			},
		);
	};

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={!isValid || isPending}
					onClick={handleComplete}
				>
					{isPending ? <Spinner size="small" /> : "완료"}
				</Button>
			</div>
		</Layout.Footer>
	);
};
