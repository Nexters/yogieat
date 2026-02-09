"use client";

import { useFormContext, useController, useWatch } from "react-hook-form";
import { isNil } from "es-toolkit";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator";
import { Button } from "#/components/button";
import { InputField } from "#/components/inputField";
import { Chip } from "#/components/chip";
import { formatDateInput, isValidDateFormat } from "#/utils/gathering/create";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";
import type { TimeSlot } from "#/types/gathering";

const TIME_SLOT_LABEL: Record<TimeSlot, string> = {
	LUNCH: "점심",
	DINNER: "저녁",
};

export const DateStepContent = () => {
	const { control } = useFormContext<CreateMeetingFormSchema>();

	const {
		field: scheduledDateField,
		fieldState: { error: scheduledDateError },
	} = useController({
		control,
		name: "scheduledDate",
	});

	const { field: timeSlotField } = useController({
		control,
		name: "timeSlot",
	});

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatDateInput(e.target.value);
		scheduledDateField.onChange(formatted);
	};

	const handleDateClear = () => {
		scheduledDateField.onChange("");
	};

	const handleTimeSlotChange = (slot: TimeSlot) => {
		timeSlotField.onChange(slot === timeSlotField.value ? null : slot);
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
						errorText={scheduledDateError?.message}
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
	const { control, getValues } = useFormContext<CreateMeetingFormSchema>();
	const isValid = useWatch({
		control,
		name: ["scheduledDate", "timeSlot"],
		compute: ([scheduledDate, timeSlot]) =>
			!isNil(scheduledDate) &&
			!isNil(timeSlot) &&
			isValidDateFormat(scheduledDate),
	});

	const handleNext = () => {
		const timeSlot = getValues("timeSlot");
		const timeSlotLabel = timeSlot ? TIME_SLOT_LABEL[timeSlot] : "";
		trackStepComplete({
			page_id: "모임생성_날짜",
			step_name: "시간대",
			step_value: timeSlotLabel,
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
