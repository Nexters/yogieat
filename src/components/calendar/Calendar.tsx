"use client";

import { type CustomComponents, DayPicker } from "react-day-picker";
import { twJoin, twMerge } from "tailwind-merge";

import { ChevronLeftIcon } from "#/icons/chevronLeftIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";

const CALENDAR_CLASS_NAMES = {
	months: "ygi:flex ygi:flex-col",
	month: "ygi:flex ygi:flex-col ygi:gap-3",
	nav: "ygi:flex ygi:items-center ygi:justify-between ygi:mb-3 ygi:h-6 ygi:w-full",
	button_previous:
		"ygi:flex ygi:h-6 ygi:w-6 ygi:items-center ygi:justify-center ygi:transition-opacity hover:ygi:opacity-70",
	button_next:
		"ygi:flex ygi:h-6 ygi:w-6 ygi:items-center ygi:justify-center ygi:transition-opacity hover:ygi:opacity-70",
	month_caption:
		"ygi:flex ygi:items-center ygi:justify-center ygi:h-6 ygi:flex-1",
	caption_label: "ygi:body-16-bd ygi:text-text-primary ygi:leading-6",
	weekdays: twJoin(
		"ygi:grid ygi:grid-cols-7",
		"ygi:mb-2.5 ygi:h-4 ygi:gap-2",
	),
	weekday: twJoin(
		"ygi:flex ygi:items-center ygi:justify-center",
		"ygi:size-[34px] ygi:px-2",
		"ygi:caption-12-rg ygi:text-text-tertiary",
	),
	week: twJoin("ygi:grid ygi:grid-cols-7", "ygi:gap-2"),
	day: twJoin(
		"ygi:flex ygi:flex-col ygi:items-center ygi:justify-center",
		"ygi:size-[34px] ygi:min-w-[34px]",
	),
	day_button: twJoin(
		"ygi:flex ygi:items-center ygi:justify-center",
		"ygi:size-[34px]",
		"ygi:px-2 ygi:py-1",
		"ygi:body-18-sb ygi:text-text-primary",
		"ygi:rounded-full",
		"ygi:transition-colors",
		"hover:ygi:bg-surface-gray",
		"data-[disabled]:ygi:text-text-disabled data-[disabled]:hover:ygi:bg-transparent",
		"data-[disabled]:ygi:cursor-not-allowed",
		"data-[outside]:ygi:text-text-disabled",
	),
	selected: twJoin(
		"ygi:rounded-full",
		"ygi:bg-surface-active ygi:text-text-inverse",
		"hover:ygi:bg-surface-active",
	),
};

export type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

const CalendarChevron: CustomComponents["Chevron"] = ({ orientation }) => {
	const ChevronIcon =
		orientation === "left" ? ChevronLeftIcon : ChevronRightIcon;
	return <ChevronIcon size={24} />;
};

const CalendarNav: CustomComponents["Nav"] = ({
	onPreviousClick,
	onNextClick,
	previousMonth,
	nextMonth,
}) => {
	// 현재 표시되고 있는 달 계산: previousMonth가 있으면 +1, 아니면 nextMonth에서 -1
	const currentMonth = previousMonth
		? new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1)
		: nextMonth
			? new Date(nextMonth.getFullYear(), nextMonth.getMonth() - 1)
			: new Date();

	const monthText = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;

	return (
		<nav className="ygi:flex ygi:items-center ygi:justify-between ygi:mb-3 ygi:h-6 ygi:w-full">
			<button
				type="button"
				disabled={!previousMonth}
				onClick={onPreviousClick}
				className="ygi:flex ygi:items-center ygi:justify-center ygi:p-1.5 ygi:transition-opacity hover:ygi:opacity-70 disabled:ygi:opacity-40"
			>
				<ChevronLeftIcon size={24} />
			</button>
			<div className="ygi:flex ygi:items-center ygi:justify-center ygi:h-6 ygi:flex-1">
				<span className="ygi:body-16-bd ygi:text-text-primary ygi:leading-6">
					{monthText}
				</span>
			</div>
			<button
				type="button"
				disabled={!nextMonth}
				onClick={onNextClick}
				className="ygi:flex ygi:items-center ygi:justify-center ygi:p-2.5 ygi:rounded-lg ygi:transition-opacity hover:ygi:opacity-70 disabled:ygi:opacity-40"
			>
				<ChevronRightIcon size={24} />
			</button>
		</nav>
	);
};

export const Calendar = ({ className, ...props }: CalendarProps) => {
	return (
		<DayPicker
			showOutsideDays={false}
			fixedWeeks
			mode="single"
			className={twMerge("ygi:w-full", className)}
			classNames={CALENDAR_CLASS_NAMES}
			components={{
				Chevron: CalendarChevron,
				Nav: CalendarNav,
				MonthCaption: () => null, // Caption을 Nav 안으로 이동했으므로 숨김
			}}
			{...props}
		/>
	);
};
