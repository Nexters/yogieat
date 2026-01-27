"use client";

import { useForm, useWatch } from "react-hook-form";
import type { OpinionForm } from "#/types/gathering";

export function useOpinionForm() {
	return useForm<OpinionForm>({
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

export type { OpinionForm };
