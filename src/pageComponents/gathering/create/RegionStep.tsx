"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button/Button";
import { Chip } from "#/components/chip";
import { Spinner } from "#/components/spinner";
import { useRegionStepValidation } from "#/hooks/gathering";
import { createGathering } from "#/apis/gathering";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";
import type { CreateMeetingForm, Region } from "#/types/gathering";

interface RegionStepProps {
	onComplete: (accessKey: string) => void;
}

const REGION_OPTIONS = [
	{ id: "HONGDAE" as const, label: "홍대입구역" },
	{ id: "GANGNAM" as const, label: "강남역" },
];

export const RegionStep = ({ onComplete }: RegionStepProps) => {
	const { control, setValue, getValues } =
		useFormContext<CreateMeetingForm>();
	const isValid = useRegionStepValidation(control);
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	const handleComplete = async () => {
		const formData = getValues();

		if (
			!formData.peopleCount ||
			!formData.region ||
			!formData.scheduledDate ||
			!formData.timeSlot
		) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await createGathering({
				peopleCount: formData.peopleCount,
				region: formData.region,
				scheduledDate: formData.scheduledDate.replace(/\./g, "-"), // yyyy.mm.dd -> yyyy-mm-dd 형태로 변환
				timeSlot: formData.timeSlot,
			});

			onComplete(response.data.accessKey);
		} catch (error) {
			if (isApiError(error)) {
				toast.warning(error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
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

			<Layout.Footer>
				<div className="ygi:px-6">
					<Button
						variant="primary"
						width="full"
						disabled={!isValid || isSubmitting}
						onClick={handleComplete}
					>
						{isSubmitting ? <Spinner size="small" /> : "완료"}
					</Button>
				</div>
			</Layout.Footer>
		</section>
	);
};
