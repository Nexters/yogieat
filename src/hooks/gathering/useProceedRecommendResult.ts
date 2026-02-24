"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "#/utils/toast";
import {
	usePostProceedRecommendResult,
	useGetRecommendResult,
} from "#/hooks/apis";
import { getRecommendResult } from "#/apis/recommendResult";
import { ERROR_CODES, isApiError } from "#/utils/api";
import { RecommendationResultStatus } from "#/constants/gathering/opinion";

export const useProceedRecommendResult = () => {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();
	const [manualPollingTrigger, setManualPollingTrigger] = useState(false);

	const { data: recommendResult } = useGetRecommendResult(accessKey);

	const { mutateAsync: proceedMutation, isPending: isMutating } =
		usePostProceedRecommendResult(accessKey);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isPollingRef = useRef(false);

	// NOTE : 현재 추천 결과가 생성 중이거나 사용자가 명시적으로 생성을 시도한 경우 Polling 을 시작함
	const shouldPoll =
		recommendResult.status === RecommendationResultStatus.PENDING ||
		manualPollingTrigger;

	useEffect(() => {
		if (!shouldPoll || isPollingRef.current) return;

		isPollingRef.current = true;

		const poll = async () => {
			try {
				const response = await getRecommendResult(accessKey);
				const { status } = response.data;

				switch (status) {
					case RecommendationResultStatus.COMPLETED:
						isPollingRef.current = false;
						setManualPollingTrigger(false);
						router.push(`/gathering/${accessKey}/opinion/result`);
						break;

					case RecommendationResultStatus.PENDING:
						timeoutRef.current = setTimeout(() => {
							poll();
						}, 1000);
						break;

					case RecommendationResultStatus.FAILED:
					default:
						isPollingRef.current = false;
						setManualPollingTrigger(false);
						toast.warning(
							"추천 결과 생성에 실패했습니다. 다시 시도해주세요.",
						);
						break;
				}
			} catch {
				isPollingRef.current = false;
				setManualPollingTrigger(false);
				toast.warning("추천 결과 조회에 실패했습니다.");
			}
		};

		poll();

		return () => {
			isPollingRef.current = false;
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [shouldPoll, accessKey, router]);

	const proceed = async () => {
		if (recommendResult.status === RecommendationResultStatus.COMPLETED) {
			router.push(`/gathering/${accessKey}/opinion/result`);
			return;
		}

		if (recommendResult.status === RecommendationResultStatus.PENDING) {
			return;
		}

		try {
			await proceedMutation(accessKey);
			setManualPollingTrigger(true);
		} catch (error) {
			if (isApiError(error)) {
				switch (error.errorCode) {
					case ERROR_CODES.RECOMMEND_ALREADY_PROCEEDED:
						setManualPollingTrigger(true);
						return;

					default:
						toast.warning(error.message);
						return;
				}
			}

			toast.warning(
				"추천 결과 생성 요청에 실패했습니다. 다시 시도해주세요.",
			);
		}
	};

	const isPending = isMutating || shouldPoll;

	return {
		proceed,
		isPending,
	};
};
