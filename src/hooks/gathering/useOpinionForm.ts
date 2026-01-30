"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	opinionFormSchema,
	distanceRangeToKm,
	type OpinionFormSchema,
} from "#/schemas/gathering";
import { useCreateParticipant } from "../apis/participant";
import { useParams, useRouter } from "next/navigation";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";
import { compact } from "es-toolkit";

export function useOpinionForm() {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();
	const { mutateAsync: createParticipant } = useCreateParticipant();

	const methods = useForm<OpinionFormSchema>({
		mode: "onChange",
		resolver: zodResolver(opinionFormSchema),
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
			const preferences = compact([
				data.preferredMenus.first,
				data.preferredMenus.second,
				data.preferredMenus.third,
			]);

			await createParticipant({
				accessKey,
				preferences,
				dislikes: data.dislikedFoods,
				distance: distanceRangeToKm(data.distanceRange),
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
