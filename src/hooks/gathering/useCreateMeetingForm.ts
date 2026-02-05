"use client";

import { useForm } from "react-hook-form";
import type { CreateMeetingForm } from "#/types/gathering";

export const useCreateMeetingForm = () => {
	const form = useForm<CreateMeetingForm>({
		mode: "onChange",
		defaultValues: {
			peopleCount: null,
			scheduledDate: "",
			timeSlot: null,
			region: null,
		},
	});

	return form;
};
