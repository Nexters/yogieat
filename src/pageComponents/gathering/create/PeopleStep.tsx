"use client";

import { useFormContext, useController, useWatch } from "react-hook-form";
import { isNil } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button";
import { PeopleIllustration } from "./PeopleIllustration/PeopleIllustration";
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
		<section className="ygi:flex ygi:h-full ygi:flex-col ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6">
				<StepIndicator currentStep={1} totalSteps={3} />
				<h1 className="ygi:heading-22-bd ygi:text-text-primary">
					몇 명이서 만나요?
				</h1>
				<PeopleCountGrid value={field.value} onChange={handleChange} />
			</div>
			<div className="ygi:flex ygi:grow ygi:flex-col ygi:items-center ygi:justify-center">
				<PeopleIllustration count={field.value} />
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
		const peopleCountLabel = peopleCount ? `${peopleCount}명` : "-";
		trackStepComplete({
			page_id: "모임생성_퍼널",
			step_name: "인원수",
			step_value: peopleCountLabel,
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
