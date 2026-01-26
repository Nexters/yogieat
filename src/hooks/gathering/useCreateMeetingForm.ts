"use client";

import { useForm, useWatch } from "react-hook-form";
import type { CreateMeetingForm } from "#/types/gathering";

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
	return peopleCount !== undefined;
};

export const useDateStepValidation = (
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) => {
	const [meetingDate, timeSlot] = useWatch({
		control,
		name: ["meetingDate", "timeSlot"],
	});
	return meetingDate !== undefined && timeSlot !== undefined;
};

export const useLocationStepValidation = (
	control: ReturnType<typeof useForm<CreateMeetingForm>>["control"],
) => {
	const location = useWatch({ control, name: "location" });
	return location !== undefined;
};
