"use client";

import { type CustomComponents, DayPicker } from "react-day-picker";
import { twJoin, twMerge } from "tailwind-merge";

import { ChevronLeftIcon } from "#/icons/chevronLeftIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";

const CALENDAR_CLASS_NAMES = {
	months: "ygi:flex ygi:flex-col",
	month: "ygi:flex ygi:flex-col ygi:gap-2",
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
		"ygi:size-[34px]",
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
		"ygi:body-18-sb ygi:tracking-[-0.27px] ygi:text-text-primary",
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
				Nav: ({ children }) => (
					<div className="ygi:flex">{children}</div>
				),
			}}
			{...props}
		/>
	);
};
