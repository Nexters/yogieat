"use client";

import { isNil } from "es-toolkit";
import { useController, useFormContext, useWatch } from "react-hook-form";

import { Button } from "#/components/button";
import { Chip } from "#/components/chip";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { ScheduledDatePicker } from "#/pageComponents/gathering/create/ScheduledDatePicker";
import type { AloneFormSchema } from "#/schemas/gathering";
import type { TimeSlot } from "#/types/gathering";
import { isValidDateFormat } from "#/utils/gathering/create";

export const AloneDateStepContent = () => {
	const { control } = useFormContext<AloneFormSchema>();

	const { field: timeSlotField } = useController({
		control,
		name: "timeSlot",
	});

	const handleTimeSlotChange = (slot: TimeSlot) => {
		timeSlotField.onChange(slot === timeSlotField.value ? null : slot);
	};

	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-xl">
				<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
					<StepHeader.Root>
						<StepHeader.Title>
							약속 날짜를 입력해 주세요
						</StepHeader.Title>
					</StepHeader.Root>
					<ScheduledDatePicker />
				</div>

				<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
					<h2 className="ygi:heading-22-bd ygi:text-text-primary">
						시간대를 선택해 주세요
					</h2>
					<div className="ygi:flex ygi:gap-md">
						<Chip
							selected={timeSlotField.value === "LUNCH"}
							onClick={() => handleTimeSlotChange("LUNCH")}
						>
							점심
						</Chip>
						<Chip
							selected={timeSlotField.value === "DINNER"}
							onClick={() => handleTimeSlotChange("DINNER")}
						>
							저녁
						</Chip>
					</div>
				</div>
			</div>
		</section>
	);
};

interface AloneDateStepFooterProps {
	onNext: () => void;
}

export const AloneDateStepFooter = ({ onNext }: AloneDateStepFooterProps) => {
	const { control } = useFormContext<AloneFormSchema>();
	const isValid = useWatch({
		control,
		name: ["scheduledDate", "timeSlot"],
		compute: ([scheduledDate, timeSlot]) =>
			!isNil(scheduledDate) &&
			!isNil(timeSlot) &&
			isValidDateFormat(scheduledDate),
	});

	const handleNext = () => {
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
