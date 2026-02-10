"use client";

import { useEffect } from "react";
import { useParams, redirect } from "next/navigation";

import { trackViewPage, trackShareClick } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { ResultView } from "#/pageComponents/gathering/opinion";
import { BackwardButton } from "#/components/backwardButton";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";
import { Toaster } from "#/components/toast";

const PAGE_ID = "추천_결과";

export function ResultViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: capacity } = useGetGatheringCapacity(accessKey);
	const { data: recommendationResult } = useGetRecommendResult(accessKey);

	const isComplete = capacity.currentCount >= capacity.maxCount;

	if (!isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleClickBackward = () => {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	};

	const handleShare = () => {
		trackShareClick({ page_id: PAGE_ID, share_location: "Footer" });
	};

	useEffect(() => {
		if (isComplete && recommendationResult && accessKey) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
			});
		}
	}, [isComplete, recommendationResult, accessKey]);

	return (
		<Layout.Root>
			<Layout.Header background="gray">
				<BackwardButton onClick={handleClickBackward} />
			</Layout.Header>

			<ResultView recommendationResult={recommendationResult} />

			<Layout.Footer background="gray">
				<div className="ygi:px-6">
					<ShareButton onShare={handleShare} />
				</div>
			</Layout.Footer>

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
