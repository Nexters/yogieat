"use client";

import { useForm, useWatch } from "react-hook-form";
import { isValidDateFormat } from "#/utils/gathering/create";
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
