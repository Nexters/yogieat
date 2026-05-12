"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useCreateGathering } from "#/hooks/apis/gathering";
import {
	createMeetingFormSchema,
	type CreateMeetingFormSchema,
} from "#/schemas/gathering";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

export function useCreateMeetingForm() {
	const router = useRouter();
	const { mutate: createGathering, isPending } = useCreateGathering();

	const methods = useForm<CreateMeetingFormSchema>({
		mode: "onChange",
		resolver: zodResolver(createMeetingFormSchema),
		defaultValues: {
			peopleCount: null,
			scheduledDate: "",
			timeSlot: null,
			region: null,
		},
	});

	const handleSubmit = methods.handleSubmit((data) => {
		if (
			!data.peopleCount ||
			!data.timeSlot ||
			!data.scheduledDate ||
			!data.region
		) {
			return;
		}

		createGathering(
			{
				peopleCount: data.peopleCount,
				region: data.region,
				scheduledDate: data.scheduledDate.replace(/\./g, "-"),
				timeSlot: data.timeSlot,
			},
			{
				onSuccess: (response) => {
					router.push(
						`/gathering/create/complete/${response.data.accessKey}`,
					);
				},
				onError: (error) => {
					if (isApiError(error)) {
						toast.warning(error.message);
					}
				},
			},
		);
	});

	return {
		methods,
		onSubmit: handleSubmit,
		isPending,
	};
}
