"use client";

import { useForm } from "react-hook-form";
import type { CreateMeetingForm } from "#/types/gathering";

export const useCreateMeetingForm = () => {
	const form = useForm<CreateMeetingForm>({
		mode: "onChange",
	});

	return form;
};
