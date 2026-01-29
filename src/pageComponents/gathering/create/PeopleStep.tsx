"use client";

import { useFormContext } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button";
import { PeopleCountGrid } from "./PeopleCountGrid";
import { usePeopleStepValidation } from "#/hooks/gathering";
import type { CreateMeetingForm } from "#/types/gathering";

export const PeopleStepContent = () => {
	const { setValue, watch } = useFormContext<CreateMeetingForm>();
	const value = watch("peopleCount");

	const handleChange = (count?: number) => {
		setValue("peopleCount", count, { shouldValidate: true });
	};

	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6">
				<StepIndicator currentStep={1} totalSteps={3} />
				<h1 className="ygi:heading-22-bd ygi:text-text-primary">
					몇 명이서 만나요?
				</h1>
				<PeopleCountGrid value={value} onChange={handleChange} />
			</div>
		</section>
	);
};

interface PeopleStepFooterProps {
	onNext: () => void;
}

export const PeopleStepFooter = ({ onNext }: PeopleStepFooterProps) => {
	const { control } = useFormContext<CreateMeetingForm>();
	const isValid = usePeopleStepValidation(control);

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={!isValid}
					onClick={onNext}
				>
					다음
				</Button>
			</div>
		</Layout.Footer>
	);
};
