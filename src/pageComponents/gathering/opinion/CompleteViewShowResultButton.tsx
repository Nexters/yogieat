"use client";

import { useState } from "react";
import { toast } from "sonner";

import { trackCtaClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { Spinner } from "#/components/spinner";
import { RecommendationResultStatus } from "#/constants/gathering/opinion";
import {
	useGetRecommendResult,
	usePostProceedRecommendResult,
	useWaitForRecommendResult,
} from "#/hooks/apis";
import { useParams } from "next/navigation";

interface CompleteViewShowResultButtonProps {
	pageId: string;
}

export const CompleteViewShowResultButton = ({
	pageId,
}: CompleteViewShowResultButtonProps) => {
	const { accessKey } = useParams<{ accessKey: string }>();
	const [shouldStartPolling, setShouldStartPolling] = useState(false);

	const {
		data: { status: recommendResultStatus },
	} = useGetRecommendResult(accessKey);

	const { mutate: proceedRecommendResult, isPending } =
		usePostProceedRecommendResult(accessKey);

	const shouldPoll =
		recommendResultStatus === RecommendationResultStatus.PENDING ||
		shouldStartPolling;

	const { isWaiting } = useWaitForRecommendResult({
		accessKey,
		enabled: shouldPoll,
	});

	const handleClickShowResultButton = () => {
		trackCtaClick({ page_id: pageId, button_name: "추천 결과 보기" });
		proceedRecommendResult(accessKey, {
			onSuccess: () => {
				setShouldStartPolling(true);
			},
			onError: () => {
				toast.error("추천 결과 생성 요청에 실패했습니다.");
			},
		});
	};

	const isProcessing = isPending || isWaiting;

	return (
		<Button
			variant="primary"
			width="full"
			disabled={isProcessing}
			onClick={handleClickShowResultButton}
		>
			{isProcessing ? <Spinner size="small" /> : "추천 결과 보기"}
		</Button>
	);
};
