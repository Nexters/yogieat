"use client";

import { useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import { RecommendationResultStatus } from "#/constants/gathering/opinion";
import {
	usePostProceedRecommendResult,
	useGetRecommendResult,
} from "#/hooks/apis";
import { isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

const NAVIGATION_DELAY = 2_500;

const PROCEED_STATUS = {
	IDLE: "idle",
	PROCESSING: "processing",
} as const;

type ProceedState =
	| { status: typeof PROCEED_STATUS.IDLE }
	| { status: typeof PROCEED_STATUS.PROCESSING; startTime: number };

export const useProceedRecommendResult = () => {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();

	const [proceedState, setProceedState] = useState<ProceedState>({
		status: PROCEED_STATUS.IDLE,
	});

	const { refetch: fetchRecommendResult } = useGetRecommendResult(accessKey);
	const { mutateAsync: proceedMutation } =
		usePostProceedRecommendResult(accessKey);

	const isProcessingRef = useRef(false);

	const onResultComplete = useCallback(async () => {
		if (!isProcessingRef.current) {
			return;
		}

		const remaining = Math.max(0, NAVIGATION_DELAY);

		setTimeout(async () => {
			const { data: refetchedResult } = await fetchRecommendResult();

			if (
				refetchedResult?.status === RecommendationResultStatus.COMPLETED
			) {
				isProcessingRef.current = false;
				setProceedState({ status: PROCEED_STATUS.IDLE });
				router.push(`/gathering/${accessKey}/opinion/result`);
			} else {
				isProcessingRef.current = false;
				setProceedState({ status: PROCEED_STATUS.IDLE });
				toast.warning(
					"추천 결과가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.",
				);
			}
		}, remaining);
	}, [accessKey, router, fetchRecommendResult]);

	const proceed = async () => {
		if (isProcessingRef.current) {
			return;
		}

		try {
			const { data: latestResult } = await fetchRecommendResult();

			if (latestResult?.status === RecommendationResultStatus.COMPLETED) {
				router.push(`/gathering/${accessKey}/opinion/result`);
				return;
			}

			if (latestResult?.status === RecommendationResultStatus.FAILED) {
				toast.warning(
					"추천 결과 생성에 실패했습니다. 다시 시도해주세요.",
				);
				return;
			}

			if (latestResult?.status === RecommendationResultStatus.PENDING) {
				isProcessingRef.current = true;
				const startTime = Date.now();
				setProceedState({ status: PROCEED_STATUS.PROCESSING, startTime });
				return;
			}

			if (!latestResult?.status) {
				isProcessingRef.current = true;
				const startTime = Date.now();
				setProceedState({ status: PROCEED_STATUS.PROCESSING, startTime });

				await proceedMutation(accessKey);
				return;
			}
		} catch (error) {
			setProceedState({ status: "idle" });
			isProcessingRef.current = false;

			const errorMessage = isApiError(error)
				? error.message
				: "추천 결과 생성 요청에 실패했습니다. 다시 시도해주세요.";

			toast.warning(errorMessage);
		}
	};

	return {
		proceed,
		isPending: proceedState.status === "processing",
		onResultComplete,
	};
};
