"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "#/components/button";
import { Spinner } from "#/components/spinner";
import { RecommendationResultStatus } from "#/constants/gathering/opinion";
import {
	usePostProceedRecommendResult,
	useWaitForRecommendResult,
} from "#/hooks/apis";
import { redirect, useParams } from "next/navigation";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";

export const PendingViewShowResultButton = () => {
	const { accessKey } = useParams<{ accessKey: string }>();
	const [shouldStartPolling, setShouldStartPolling] = useState(false);

	const {
		data: { currentCount, maxCount },
	} = useGetGatheringCapacity(accessKey);
	const {
		data: { status: recommendResultStatus },
	} = useGetRecommendResult(accessKey);

	const { mutate: proceedRecommendResult, isPending } =
		usePostProceedRecommendResult(accessKey);

	const { isWaiting } = useWaitForRecommendResult({
		accessKey,
		enabled:
			recommendResultStatus === RecommendationResultStatus.PENDING ||
			shouldStartPolling,
	});

	const handleClickShowResultButton = () => {
		if (recommendResultStatus === RecommendationResultStatus.COMPLETED) {
			redirect(`/gathering/${accessKey}/opinion/result`);
		}

		proceedRecommendResult(accessKey, {
			onSuccess: () => {
				setShouldStartPolling(true);
			},
			onError: () => {
				toast.error("추천 결과 생성 요청에 실패했습니다.");
			},
		});
	};

	const hasReachedMajority = currentCount * 2 >= maxCount;

	const isProcessing = isPending || isWaiting;
	const disabled = !hasReachedMajority || isProcessing;

	return (
		<Button
			variant="primary"
			width="full"
			disabled={disabled}
			onClick={handleClickShowResultButton}
		>
			{isProcessing ? <Spinner size="small" /> : "추천 결과 보기"}
		</Button>
	);
};
