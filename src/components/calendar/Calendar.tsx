"use client";

import { useState } from "react";
import { addMonths, isSameMonth, startOfMonth } from "date-fns";
import { type CustomComponents, DayPicker } from "react-day-picker";
import { twJoin, twMerge } from "tailwind-merge";

import { ChevronLeftIcon } from "#/icons/chevronLeftIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";

export type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

const CALENDAR_CLASS_NAMES = {
	months: "ygi:flex ygi:flex-col",
	month: "ygi:flex ygi:flex-col ygi:gap-0",
	nav: "ygi:flex ygi:items-center ygi:justify-between ygi:mb-0 ygi:h-6 ygi:w-full",
	button_previous:
		"ygi:flex ygi:h-6 ygi:w-6 ygi:items-center ygi:justify-center ygi:transition-opacity hover:ygi:opacity-70",
	button_next:
		"ygi:flex ygi:h-6 ygi:w-6 ygi:items-center ygi:justify-center ygi:transition-opacity hover:ygi:opacity-70",
	month_caption:
		"ygi:flex ygi:items-center ygi:justify-center ygi:h-6 ygi:flex-1",
	caption_label: "ygi:heading-18-sb ygi:text-text-primary ygi:leading-6",
	weekdays: twJoin("ygi:mb-2.5 ygi:grid ygi:grid-cols-7 ygi:gap-3"),
	weekday: twJoin(
		"ygi:flex ygi:items-center ygi:justify-center ygi:px-2",
		"ygi:caption-12-rg ygi:text-text-secondary",
	),
	week: "ygi:grid ygi:grid-cols-7 ygi:gap-3",
	day: twJoin(
		"ygi:flex ygi:flex-col ygi:items-center ygi:justify-center",
		"ygi:mx-auto ygi:size-[34px] ygi:min-w-[34px] ygi:px-2",
	),
	day_button: twJoin(
		"ygi:flex ygi:size-[34px] ygi:items-center ygi:justify-center ygi:px-2 ygi:py-1",
		"ygi:heading-18-sb ygi:rounded-full ygi:text-text-primary ygi:transition-colors",
	),
	selected: "ygi:bg-surface-active ygi:text-text-inverse ygi:rounded-xl",
	outside: "ygi:text-text-disabled",
	disabled: "ygi:cursor-not-allowed ygi:text-text-disabled",
};

const CalendarDayButton: CustomComponents["DayButton"] = ({
	day,
	modifiers,
	...props
}) => {
	// NOTE : react-day-picker 에서는 className 병합에 대한 tailwindCSS 예외 처리가 없어 수동 병합
	const buttonClasses = twMerge(
		CALENDAR_CLASS_NAMES.day_button,
		modifiers.selected && CALENDAR_CLASS_NAMES.selected,
		modifiers.outside && CALENDAR_CLASS_NAMES.outside,
		modifiers.disabled && CALENDAR_CLASS_NAMES.disabled,
	);

	return (
		<button {...props} type="button" className={buttonClasses}>
			{day.date.getDate()}
		</button>
	);
};

const CalendarNav: CustomComponents["Nav"] = ({
	onPreviousClick,
	onNextClick,
	previousMonth,
	nextMonth,
}) => {
	// NOTE : Nav 에는 현재 시점의 Month 값이 없어 이전과 이후 값을 활용하여 산정
	const referenceMonth = previousMonth ?? nextMonth ?? new Date();
	const offset = previousMonth ? 1 : nextMonth ? -1 : 0;

	const currentMonth = addMonths(referenceMonth, offset);
	const monthText = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;

	return (
		<nav className="ygi:mb-2.5 ygi:flex ygi:h-6 ygi:w-full ygi:items-center ygi:justify-center">
			<button
				type="button"
				disabled={!previousMonth}
				onClick={onPreviousClick}
				className="hover:ygi:opacity-70 disabled:ygi:opacity-40 ygi:flex ygi:items-center ygi:justify-center ygi:p-1.5 ygi:transition-opacity"
			>
				<ChevronLeftIcon size={24} />
			</button>
			<div className="ygi:flex ygi:items-center ygi:justify-center">
				<span className="ygi:text-center ygi:heading-18-bd ygi:leading-normal ygi:text-text-primary">
					{monthText}
				</span>
			</div>
			<button
				type="button"
				disabled={!nextMonth}
				onClick={onNextClick}
				className="hover:ygi:opacity-70 disabled:ygi:opacity-40 ygi:flex ygi:items-center ygi:justify-center ygi:overflow-clip ygi:rounded-lg ygi:p-2.5 ygi:transition-opacity"
			>
				<ChevronRightIcon size={24} />
			</button>
		</nav>
	);
};

export const Calendar = ({
	className,
	month: controlledMonth,
	onMonthChange,
	onDayClick,
	...props
}: CalendarProps) => {
	const [internalMonth, setInternalMonth] = useState<Date>(
		controlledMonth ?? new Date(),
	);

	// Controlled vs Uncontrolled
	const isControlled = controlledMonth !== undefined;
	const currentMonth = isControlled ? controlledMonth : internalMonth;

	const handleMonthChange = (newMonth: Date) => {
		if (!isControlled) {
			setInternalMonth(newMonth);
		}
		onMonthChange?.(newMonth);
	};

	const handleDayClick: typeof onDayClick = (day, modifiers, e) => {
		// 다음 달 또는 이전 달의 날짜를 클릭한 경우
		if (modifiers.outside && !isSameMonth(day, currentMonth)) {
			handleMonthChange(startOfMonth(day));
		}

		// 원래의 onDayClick 핸들러 호출
		onDayClick?.(day, modifiers, e);
	};

	return (
		<DayPicker
			showOutsideDays
			fixedWeeks
			mode="single"
			month={currentMonth}
			onMonthChange={handleMonthChange}
			onDayClick={handleDayClick}
			className={twMerge("ygi:w-full", className)}
			classNames={CALENDAR_CLASS_NAMES}
			components={{
				Nav: CalendarNav,
				DayButton: CalendarDayButton,
				MonthCaption: () => <></>, // NOTE : Caption을 Nav 안으로 이동했으므로 숨김
			}}
			{...props}
		/>
	);
};
