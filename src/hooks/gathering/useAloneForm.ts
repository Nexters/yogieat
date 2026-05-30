"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { compact } from "es-toolkit";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useCreateGathering } from "#/hooks/apis/gathering";
import { useCreateParticipant } from "#/hooks/apis/participant";
import { aloneFormSchema, type AloneFormSchema } from "#/schemas/gathering";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

export function useAloneForm() {
	const router = useRouter();
	const { mutateAsync: createGathering, isPending: isGatheringPending } =
		useCreateGathering();
	const { mutateAsync: createParticipant, isPending: isParticipantPending } =
		useCreateParticipant();

	const methods = useForm<AloneFormSchema>({
		mode: "onChange",
		resolver: zodResolver(aloneFormSchema),
		defaultValues: {
			scheduledDate: "",
			timeSlot: null,
			region: null,
			dislikedCategories: [],
			preferredCategories: {
				first: undefined,
				second: undefined,
				third: undefined,
			},
		},
	});

	const handleSubmit = methods.handleSubmit(async (data) => {
		if (!data.timeSlot || !data.region) return;

		try {
			const { data: gathering } = await createGathering({
				peopleCount: 1,
				region: data.region,
				scheduledDate: data.scheduledDate.replace(/\./g, "-"),
				timeSlot: data.timeSlot,
			});

			const preferences = compact([
				data.preferredCategories.first,
				data.preferredCategories.second,
				data.preferredCategories.third,
			]);

			await createParticipant({
				accessKey: gathering.accessKey,
				nickname: "나",
				dislikes: data.dislikedCategories,
				preferences,
				distance: null,
			});

			router.replace(
				`/gathering/${gathering.accessKey}/opinion/complete`,
			);
		} catch (error) {
			if (isApiError(error)) {
				toast.warning(error.message);
				return;
			}
			toast.warning("결과 생성에 실패했습니다. 다시 시도해주세요.");
		}
	});

	return {
		methods,
		onSubmit: handleSubmit,
		isPending: isGatheringPending || isParticipantPending,
	};
}
