"use client";

import { useForm, useWatch } from "react-hook-form";
import type { OpinionForm } from "#/types/gathering";
import { useCreateParticipant } from "../apis/gathering";
import { useParams, useRouter } from "next/navigation";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

export function useOpinionForm() {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();
	const { mutateAsync: createParticipant } = useCreateParticipant();

	const methods = useForm<OpinionForm>({
		mode: "onChange",
		defaultValues: {
			distanceRange: undefined,
			dislikedFoods: [],
			preferredMenus: {
				first: undefined,
				second: undefined,
				third: undefined,
			},
		},
	});

	const handleSubmit = methods.handleSubmit(async (data) => {
		try {
			await createParticipant({
				accessKey,
				preferences: [
					data.preferredMenus.first,
					data.preferredMenus.second,
					data.preferredMenus.third,
				],
				dislikes: data.dislikedFoods,
				distance: 0.5,
			});
			router.replace(`/gathering/${accessKey}/opinion/pending`);
		} catch (error) {
			if (isApiError(error)) {
				toast.warning(error.message);
				return;
			}
			toast.warning("모임 참여에 실패했습니다. 다시 시도해주세요.");
		}
	});

	return {
		methods,
		onSubmit: handleSubmit,
	};
}

export function useDistanceStepValidation(
	control: ReturnType<typeof useForm<OpinionForm>>["control"],
) {
	const distanceRange = useWatch({ control, name: "distanceRange" });
	return distanceRange !== undefined;
}

export function useDislikeStepValidation(
	control: ReturnType<typeof useForm<OpinionForm>>["control"],
) {
	const dislikedFoods = useWatch({ control, name: "dislikedFoods" });
	return dislikedFoods && dislikedFoods.length > 0;
}

export function usePreferenceStepValidation() {
	return true;
}
