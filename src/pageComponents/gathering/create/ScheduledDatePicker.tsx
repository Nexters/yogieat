"use client";

import { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import { format, parse, startOfDay } from "date-fns";
import { ko } from "date-fns/locale";

import { InputField } from "#/components/inputField";
import { BottomSheet } from "#/components/bottomSheet";
import { Calendar } from "#/components/calendar";
import { Button } from "#/components/button";
import type { CreateMeetingFormSchema } from "#/schemas/gathering";

const DATE_FORMAT = "yyyy.MM.dd";
const today = startOfDay(new Date());

const parseDate = (value: string | undefined): Date | undefined => {
	if (!value) return undefined;
	try {
		return parse(value, DATE_FORMAT, new Date());
	} catch {
		return undefined;
	}
};

const formatDate = (date: Date): string => format(date, DATE_FORMAT, { locale: ko });

const formatCaption = (date: Date): string =>
	`${date.getFullYear()}년 ${date.getMonth() + 1}월`;

const isBeforeToday = (date: Date): boolean => date < today;

export const ScheduledDatePicker = () => {
	const { control } = useFormContext<CreateMeetingFormSchema>();
	const [isOpen, setIsOpen] = useState(false);
	const [pendingDate, setPendingDate] = useState<Date | undefined>();
	const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

	const {
		field: { value, onChange },
		fieldState: { error },
	} = useController({
		control,
		name: "scheduledDate",
	});

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (open) {
			const initialDate = parseDate(value);
			setPendingDate(initialDate);
			setCalendarMonth(initialDate ?? new Date());
		}
	};

	const handleDateConfirm = () => {
		if (!pendingDate) return;
		onChange(formatDate(pendingDate));
		setIsOpen(false);
	};

	return (
		<BottomSheet open={isOpen} onOpenChange={handleOpenChange}>
			<BottomSheet.Trigger>
				<div>
					<InputField
						className="ygi:cursor-pointer"
						placeholder="YYYY.MM.DD."
						errorText={error?.message}
						readOnly
						value={value || ""}
						onClick={() => setIsOpen(true)}
					/>
				</div>
			</BottomSheet.Trigger>
			<BottomSheet.Content open={isOpen} title="약속 날짜 선택">
				<div className="ygi:flex ygi:flex-col ygi:gap-9">
					<Calendar
						mode="single"
						month={calendarMonth}
						onMonthChange={setCalendarMonth}
						selected={pendingDate}
						onSelect={setPendingDate}
						locale={ko}
						disabled={isBeforeToday}
						formatters={{ formatCaption }}
					/>
					<Button
						type="button"
						onClick={handleDateConfirm}
						disabled={!pendingDate}
						variant="primary"
						width="full"
					>
						입력
					</Button>
				</div>
			</BottomSheet.Content>
		</BottomSheet>
	);
};
