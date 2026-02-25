"use client";

import { compact } from "es-toolkit";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateParticipant } from "#/hooks/apis";
import { ToastLinkButton } from "#/pageComponents/gathering/opinion";
import {
	opinionFormSchema,
	distanceRangeToKm,
	type OpinionFormSchema,
} from "#/schemas/gathering";
import { ERROR_CODES, isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

export function useOpinionForm() {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();
	const { mutateAsync: createParticipant } = useCreateParticipant();

	const methods = useForm<OpinionFormSchema>({
		mode: "onChange",
		resolver: zodResolver(opinionFormSchema),
		defaultValues: {
			nickname: "",
			distanceRange: undefined,
			dislikedCategories: [],
			preferredCategories: {
				first: undefined,
				second: undefined,
				third: undefined,
			},
		},
	});

	const handleSubmit = methods.handleSubmit(async (data) => {
		try {
			const preferences = compact([
				data.preferredCategories.first,
				data.preferredCategories.second,
				data.preferredCategories.third,
			]);

			await createParticipant({
				accessKey,
				preferences,
				nickname: data.nickname,
				dislikes: data.dislikedCategories,
				distance: distanceRangeToKm(data.distanceRange),
			});
			router.replace(`/gathering/${accessKey}/opinion/pending`);
		} catch (error) {
			if (isApiError(error)) {
				switch (error.errorCode) {
					case ERROR_CODES.GATHERING_FULL:
					case ERROR_CODES.DUPLICATE_NICKNAME:
					case ERROR_CODES.RECOMMEND_ALREADY_PROCEEDED: {
						toast.warning(error.message, {
							action: (
								<ToastLinkButton
									label="추천 결과 보기"
									onClick={() => {
										router.push(
											`/gathering/${accessKey}/opinion/result`,
										);
									}}
								/>
							),
						});
						return;
					}
				}

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
