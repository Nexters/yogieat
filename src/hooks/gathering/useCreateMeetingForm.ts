"use client";

import { useForm, useWatch } from "react-hook-form";
import { isValidDateFormat } from "#/utils/gathering/create";
import type { CreateMeetingForm } from "#/types/gathering";
import { isNil } from "es-toolkit";

export const useCreateMeetingForm = () => {
	const form = useForm<CreateMeetingForm>({
		mode: "onChange",
	});

	return form;
};

export const usePeopleStepValidation = (
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) => {
	const peopleCount = useWatch({ control, name: "peopleCount" });
	return !isNil(peopleCount);
};

export const useDateStepValidation = (
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) => {
	const [meetingDate, timeSlot] = useWatch({
		control,
		name: ["meetingDate", "timeSlot"],
	});

	return (
		!isNil(meetingDate) &&
		!isNil(timeSlot) &&
		isValidDateFormat(meetingDate)
	);
};

export const useLocationStepValidation = (
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) => {
	const location = useWatch({ control, name: "location" });
	return !isNil(location);
};
