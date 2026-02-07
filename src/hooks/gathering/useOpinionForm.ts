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
import { ERROR_CODES, isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";
import { compact } from "es-toolkit";
import { createElement } from "react";
import { ArrowLeftIcon } from "#/icons/arrowLeftIcon";

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
				if (error.errorCode === ERROR_CODES.GATHERING_FULL) {
					toast.warning(error.message, {
						action: createElement(
							"button",
							{
								type: "button",
								className:
									"ygi:flex ygi:ml-auto ygi:items-center ygi:gap-0.5 ygi:justify-center ygi:cursor-pointer ygi:text-palette-primary-500 ygi:body-14-sb",
								onClick: () => {
									router.push(
										`/gathering/${accessKey}/opinion/result`,
									);
								},
							},
							"추천 결과 보기",
							createElement(ArrowLeftIcon, {
								size: 20,
								className:
									"ygi:text-palette-primary-500 ygi:rotate-180",
							}),
						),
					});
					return;
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
