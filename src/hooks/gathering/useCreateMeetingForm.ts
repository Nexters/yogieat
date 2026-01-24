"use client";

import { useForm, useWatch } from "react-hook-form";
import type { CreateMeetingForm } from "#/types/gathering";

export function useCreateMeetingForm() {
	const form = useForm<CreateMeetingForm>({
		mode: "onChange",
	});

	return form;
}

export function usePeopleStepValidation(
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) {
	const peopleCount = useWatch({ control, name: "peopleCount" });
	return peopleCount !== undefined;
}

const DATE_PATTERN = /^\d{4}\.\d{2}\.\d{2}$/;

const isValidDateFormat = (value: string): boolean => {
	if (!DATE_PATTERN.test(value)) {
		return false;
	}

	const [year, month, day] = value.split(".").map(Number);
	const date = new Date(year, month - 1, day);

	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
};

export function useDateStepValidation(
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) {
	const [meetingDate, timeSlot] = useWatch({
		control,
		name: ["meetingDate", "timeSlot"],
	});
	return (
		meetingDate !== undefined &&
		isValidDateFormat(meetingDate) &&
		timeSlot !== undefined
	);
}

export function useLocationStepValidation(
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) {
	const location = useWatch({ control, name: "location" });
	return location !== undefined;
}
