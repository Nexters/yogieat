"use client";

import { useFormContext, useController, useWatch } from "react-hook-form";
import { isNil } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button";
import { PeopleCountGrid } from "./PeopleCountGrid";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

export const PeopleStepContent = () => {
	const { control } = useFormContext<CreateMeetingFormSchema>();
	const { field } = useController({
		control,
		name: "peopleCount",
	});

	const handleChange = (count: number | null) => {
		field.onChange(count);
	};

	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6">
				<StepIndicator currentStep={1} totalSteps={3} />
				<h1 className="ygi:heading-22-bd ygi:text-text-primary">
					몇 명이서 만나요?
				</h1>
				<PeopleCountGrid value={field.value} onChange={handleChange} />
			</div>
		</section>
	);
};

interface PeopleStepFooterProps {
	onNext: () => void;
}

export const PeopleStepFooter = ({ onNext }: PeopleStepFooterProps) => {
	const { control, getValues } = useFormContext<CreateMeetingFormSchema>();
	const isValid = useWatch({
		control,
		name: "peopleCount",
		compute: (peopleCount) => !isNil(peopleCount),
	});

	const handleNext = () => {
		const peopleCount = getValues("peopleCount");
		trackStepComplete({
			page_id: "모임생성_인원수",
			step_name: "인원수",
			step_value: `${peopleCount}명`,
		});
		onNext();
	};

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					type="button"
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
