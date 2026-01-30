"use client";

import { useFormContext, useController } from "react-hook-form";
import { isNil } from "es-toolkit";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button";
import { InputField } from "#/components/inputField";
import { Chip } from "#/components/chip";
import { formatDateInput, isValidDateFormat } from "#/utils/gathering/create";
import type { CreateMeetingForm, TimeSlot } from "#/types/gathering";

const scheduledDateRules = {
	validate: (value: string | undefined) =>
		!isNil(value) && isValidDateFormat(value),
};

const timeSlotRules = {
	validate: (value: TimeSlot | undefined) => !isNil(value),
};

export const DateStepContent = () => {
	const { control } = useFormContext<CreateMeetingForm>();

	const { field: scheduledDateField } = useController({
		control,
		name: "scheduledDate",
		rules: scheduledDateRules,
	});

	const { field: timeSlotField } = useController({
		control,
		name: "timeSlot",
		rules: timeSlotRules,
	});

	const hasDateError =
		scheduledDateField.value?.length === 10 &&
		!isValidDateFormat(scheduledDateField.value);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatDateInput(e.target.value);
		scheduledDateField.onChange(formatted);
	};

	const handleDateClear = () => {
		scheduledDateField.onChange("");
	};

	const handleTimeSlotChange = (slot: TimeSlot) => {
		timeSlotField.onChange(slot === timeSlotField.value ? undefined : slot);
	};

	return (
		<section className="ygi:pt-3">
			<div className="ygi:flex ygi:flex-col ygi:gap-8">
				<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
					<StepIndicator currentStep={2} totalSteps={3} />
					<h1 className="ygi:heading-22-bd ygi:text-text-primary">
						약속 날짜를 입력해 주세요
					</h1>
					<InputField
						placeholder="날짜를 입력해주세요"
						helperText="예) 2026.01.28"
						errorText={
							hasDateError
								? "올바른 날짜 형식이 아닙니다"
								: undefined
						}
						inputMode="numeric"
						showClearButton
						value={scheduledDateField.value || ""}
						onChange={handleDateChange}
						onClear={handleDateClear}
					/>
				</div>

				<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
					<h2 className="ygi:heading-22-bd ygi:text-text-primary">
						시간대를 선택해 주세요
					</h2>
					<div className="ygi:flex ygi:gap-3">
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

interface DateStepFooterProps {
	onNext: () => void;
}

export const DateStepFooter = ({ onNext }: DateStepFooterProps) => {
	const { control } = useFormContext<CreateMeetingForm>();

	const { field: scheduledDateField } = useController({
		control,
		name: "scheduledDate",
		rules: scheduledDateRules,
	});

	const { field: timeSlotField } = useController({
		control,
		name: "timeSlot",
		rules: timeSlotRules,
	});

	const isValid =
		!isNil(scheduledDateField.value) &&
		isValidDateFormat(scheduledDateField.value) &&
		!isNil(timeSlotField.value);

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					type="button"
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
