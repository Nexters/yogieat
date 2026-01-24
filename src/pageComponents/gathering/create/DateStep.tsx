"use client";

import { useFormContext } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { Button } from "#/components/button/Button";
import { InputField } from "#/components/inputField";
import { Chip } from "#/components/chip";
import { useDateStepValidation } from "#/hooks/gathering";
import { DATE_PATTERN } from "#/constants/gathering/create";
import { formatDateInput } from "#/utils/gathering/create";
import type { CreateMeetingForm, TimeSlot } from "#/types/gathering";

interface DateStepProps {
	onNext: () => void;
}

export const DateStep = ({ onNext }: DateStepProps) => {
	const { control, setValue, watch } = useFormContext<CreateMeetingForm>();
	const isValid = useDateStepValidation(control);

	const meetingDate = watch("meetingDate");
	const timeSlot = watch("timeSlot");

	const hasDateError = meetingDate && !DATE_PATTERN.test(meetingDate);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatDateInput(e.target.value);
		setValue("meetingDate", formatted, { shouldValidate: true });
	};

	const handleTimeSlotChange = (slot: TimeSlot) => {
		if (timeSlot === slot) {
			setValue("timeSlot", undefined as unknown as TimeSlot, {
				shouldValidate: true,
			});
		} else {
			setValue("timeSlot", slot, { shouldValidate: true });
		}
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
						value={meetingDate || ""}
						onChange={handleDateChange}
					/>
				</div>

				<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
					<h2 className="ygi:heading-22-bd ygi:text-text-primary">
						시간대를 선택해 주세요
					</h2>
					<div className="ygi:flex ygi:gap-3">
						<Chip
							selected={timeSlot === "lunch"}
							onClick={() => handleTimeSlotChange("lunch")}
						>
							점심
						</Chip>
						<Chip
							selected={timeSlot === "dinner"}
							onClick={() => handleTimeSlotChange("dinner")}
						>
							저녁
						</Chip>
					</div>
				</div>
			</div>

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
		</section>
	);
};
