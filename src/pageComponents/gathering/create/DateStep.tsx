"use client";

import { useFormContext } from "react-hook-form";

import { Layout } from "#/components/layout";
import { StepIndicator } from "#/components/stepIndicator/StepIndicator";
import { Button } from "#/components/button/Button";
import { InputField } from "#/components/inputField";
import { Chip } from "#/components/chip";
import { useDateStepValidation } from "#/hooks/gathering";
import type { CreateMeetingForm, TimeSlot } from "#/types/gathering";

interface DateStepProps {
	onNext: () => void;
}

const DATE_PATTERN = /^\d{4}\.\d{2}\.\d{2}$/;

const formatDateInput = (value: string): string => {
	const rawDigits = value.replace(/\D/g, "");
	let digits = "";

	for (let i = 0; i < rawDigits.length && digits.length < 8; i++) {
		const char = rawDigits[i];
		const pos = digits.length;

		// 연도 첫 자리 (0번 위치): 0 불가
		if (pos === 0 && char === "0") {
			continue;
		}

		// 월 첫 자리 (4번 위치): 0, 1만 허용
		if (pos === 4 && char !== "0" && char !== "1") {
			continue;
		}

		// 월 둘째 자리 (5번 위치)
		if (pos === 5) {
			const monthFirst = digits[4];
			// 0X: 1-9만 허용 (01-09)
			if (monthFirst === "0" && char === "0") {
				continue;
			}
			// 1X: 0-2만 허용 (10-12)
			if (monthFirst === "1" && Number(char) > 2) {
				continue;
			}
		}

		// 일 첫 자리 (6번 위치): 0, 1, 2, 3만 허용
		if (pos === 6 && Number(char) > 3) {
			continue;
		}

		// 일 둘째 자리 (7번 위치)
		if (pos === 7) {
			const dayFirst = digits[6];
			// 0X: 1-9만 허용 (01-09)
			if (dayFirst === "0" && char === "0") {
				continue;
			}
			// 3X: 0-1만 허용 (30-31)
			if (dayFirst === "3" && Number(char) > 1) {
				continue;
			}
		}

		digits += char;
	}

	if (digits.length <= 4) {
		return digits;
	}

	if (digits.length <= 6) {
		return `${digits.slice(0, 4)}.${digits.slice(4)}`;
	}

	return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
};

export function DateStep({ onNext }: DateStepProps) {
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
}
