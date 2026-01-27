"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { Button } from "#/components/button/Button";
import { Chip } from "#/components/chip";
import { useRegionStepValidation } from "#/hooks/gathering";
import type { CreateMeetingForm, Region } from "#/types/gathering";

interface RegionStepProps {
	onComplete: () => void;
}

const REGION_OPTIONS = [
	{ id: "HONGDAE" as const, label: "홍대입구역" },
	{ id: "GANGNAM" as const, label: "강남역" },
];

export const RegionStep = ({ onComplete }: RegionStepProps) => {
	const { control, setValue } = useFormContext<CreateMeetingForm>();
	const isValid = useRegionStepValidation(control);

	const region = useWatch({ control, name: "region" });

	const handleRegionChange = (loc: Region) => {
		setValue("region", loc === region ? undefined : loc, {
			shouldValidate: true,
		});
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
						disabled={!isValid}
						onClick={onComplete}
					>
						완료
					</Button>
				</div>
			</Layout.Footer>
		</section>
	);
};
