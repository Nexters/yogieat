"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { Button } from "#/components/button/Button";
import { InputField } from "#/components/inputField";
import { Chip } from "#/components/chip";
import { useDateStepValidation } from "#/hooks/gathering";
import { formatDateInput, isValidDateFormat } from "#/utils/gathering/create";
import type { CreateMeetingForm, TimeSlot } from "#/types/gathering";

interface DateStepProps {
	onNext: () => void;
}

export const DateStep = ({ onNext }: DateStepProps) => {
	const { control, setValue } = useFormContext<CreateMeetingForm>();
	const isValid = useDateStepValidation(control);

	const meetingDate = useWatch({ control, name: "meetingDate" });
	const timeSlot = useWatch({ control, name: "timeSlot" });

	const hasDateError =
		meetingDate?.length === 10 && !isValidDateFormat(meetingDate);

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatDateInput(e.target.value);
		setValue("meetingDate", formatted, { shouldValidate: true });
	};

	const handleDateClear = () => {
		setValue("meetingDate", "", { shouldValidate: true });
	};

	const handleTimeSlotChange = (slot: TimeSlot) => {
		setValue("timeSlot", slot === timeSlot ? undefined : slot, {
			shouldValidate: true,
		});
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
						value={meetingDate || ""}
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
							selected={timeSlot === "LUNCH"}
							onClick={() => handleTimeSlotChange("LUNCH")}
						>
							점심
						</Chip>
						<Chip
							selected={timeSlot === "DINNER"}
							onClick={() => handleTimeSlotChange("DINNER")}
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
