"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { compact } from "es-toolkit";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { RANDOM_NICKNAMES } from "#/constants/nickname";
import { useCreateParticipant, useGetRecommendResult } from "#/hooks/apis";
import { ToastLinkButton } from "#/pageComponents/gathering/opinion";
import { opinionFormSchema, type OpinionFormSchema } from "#/schemas/gathering";
import { ERROR_CODES, isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

export function useOpinionForm() {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();

	const { refetch: refetchRecommendResult } =
		useGetRecommendResult(accessKey);
	const { mutateAsync: createParticipant, isPending } =
		useCreateParticipant();

	const methods = useForm<OpinionFormSchema>({
		mode: "onChange",
		resolver: zodResolver(opinionFormSchema),
		defaultValues: {
			dislikedCategories: [],
			preferredCategories: {
				first: undefined,
				second: undefined,
				third: undefined,
			},
		},
	});

	const handleClickShowResultButton = async () => {
		await refetchRecommendResult();
		router.push(`/gathering/${accessKey}/opinion/result`);
	};

	const handleSubmit = methods.handleSubmit(async (data) => {
		const preferences = compact([
			data.preferredCategories.first,
			data.preferredCategories.second,
			data.preferredCategories.third,
		]);

		const shuffledNicknames = [...RANDOM_NICKNAMES].sort(
			() => Math.random() - 0.5,
		);

		for (const nickname of shuffledNicknames) {
			try {
				await createParticipant({
					accessKey,
					preferences,
					nickname,
					dislikes: data.dislikedCategories,
					distance: null, // NOTE : 거리 스텝이 제거되어 ANY (null) 로 수정
				});
				router.replace(`/gathering/${accessKey}/opinion/pending`);
				return;
			} catch (error) {
				if (isApiError(error)) {
					if (error.errorCode === ERROR_CODES.DUPLICATE_NICKNAME)
						continue;

					if (
						error.errorCode === ERROR_CODES.GATHERING_FULL ||
						error.errorCode ===
							ERROR_CODES.RECOMMEND_ALREADY_PROCEEDED
					) {
						toast.warning(error.message, {
							action: (
								<ToastLinkButton
									label="추천 결과 보기"
									onClick={handleClickShowResultButton}
								/>
							),
						});
						return;
					}

					toast.warning(error.message);
					return;
				}
				toast.warning("모임 참여에 실패했습니다. 다시 시도해주세요.");
				return;
			}
		}

		toast.warning("모임 참여에 실패했습니다. 다시 시도해주세요.");
	});

	return {
		methods,
		onSubmit: handleSubmit,
		isPending,
	};
}
