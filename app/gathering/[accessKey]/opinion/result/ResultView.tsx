"use client";

import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { ResultView } from "#/pageComponents/gathering/opinion";
import { useParams, redirect } from "next/navigation";
import { BackwardButton } from "#/components/backwardButton";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { useGetRecommendResult } from "#/hooks/apis/recommend-result";

export default function ResultViewContainer() {
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

	return (
		<Layout.Root>
			<Layout.Header background="gray">
				<BackwardButton onClick={handleClickBackward} />
			</Layout.Header>
			<ResultView recommendationResult={recommendationResult} />

			<Layout.Footer background="gray">
				<div className="ygi:mt-auto ygi:px-6 ygi:pt-4">
					<ShareButton disabled={false} />
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
