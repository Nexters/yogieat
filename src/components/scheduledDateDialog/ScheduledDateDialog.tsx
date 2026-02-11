"use client";

import { useState, useMemo } from "react";
import { useFormContext, useController } from "react-hook-form";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import { twJoin } from "tailwind-merge";

import { InputField } from "#/components/inputField";
import { BottomSheet } from "#/components/bottomSheet";
import { Calendar } from "#/components/calendar";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

export const ScheduledDateDialog = () => {
	const { control } = useFormContext<CreateMeetingFormSchema>();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();

	const {
		field: scheduledDateField,
		fieldState: { error: scheduledDateError },
	} = useController({
		control,
		name: "scheduledDate",
	});

	const initialDate = useMemo(() => {
		if (!scheduledDateField.value) return undefined;
		try {
			return parse(scheduledDateField.value, "yyyy.MM.dd", new Date());
		} catch {
			return undefined;
		}
	}, [scheduledDateField.value]);

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (open && initialDate) {
			setSelectedDate(initialDate);
		}
	};

	const handleDateSelect = (date: Date | undefined) => {
		setSelectedDate(date);
	};

	const handleDateConfirm = () => {
		if (selectedDate) {
			const formatted = format(selectedDate, "yyyy.MM.dd", {
				locale: ko,
			});
			scheduledDateField.onChange(formatted);
			setIsOpen(false);
		}
	};

	const handleDateClear = () => {
		scheduledDateField.onChange("");
		setSelectedDate(undefined);
	};

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return (
		<BottomSheet open={isOpen} onOpenChange={handleOpenChange}>
			<BottomSheet.Trigger>
				<div>
					<InputField
						placeholder="YYYY.MM.DD."
						errorText={scheduledDateError?.message}
						readOnly
						showClearButton
						value={scheduledDateField.value || ""}
						onClear={handleDateClear}
						onClick={() => setIsOpen(true)}
					/>
				</div>
			</BottomSheet.Trigger>
			<BottomSheet.Content open={isOpen} title="약속 날짜 선택">
				<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:pb-6">
					<div className="ygi:px-5">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={handleDateSelect}
							locale={ko}
							disabled={(date) => date < today}
							formatters={{
								formatCaption: (date) => {
									return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
								},
							}}
						/>
					</div>

					<div className="ygi:px-5">
						<button
							type="button"
							onClick={handleDateConfirm}
							disabled={!selectedDate}
							className={twJoin(
								"ygi:h-14 ygi:w-full",
								"ygi:rounded-xl ygi:bg-button-primary ygi:text-text-inverse",
								"ygi:heading-18-bd",
								"disabled:ygi:cursor-not-allowed disabled:ygi:opacity-40",
							)}
						>
							입력
						</button>
					</div>
				</div>
			</BottomSheet.Content>
		</BottomSheet>
	);
};
