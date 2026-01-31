"use client";

import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useParams, redirect } from "next/navigation";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { share } from "#/utils/share";

export default function PendingViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: capacity } = useGetGatheringCapacity(accessKey);

	const isComplete = capacity.currentCount >= capacity.maxCount;

	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleShare = () => {
		const opinionUrl = `${window.location.origin}/gathering/${accessKey}/opinion`;
		share({
			title: "함께 갈 맛집, 같이 정해요!",
			text: "[요기잇] 다인원을 위한 맛집 서비스",
			url: opinionUrl,
		});
	};

	return (
		<Layout.Root>
			<PendingView />

			<SubmissionBottomSheet
				maxCount={capacity.maxCount}
				currentCount={capacity.currentCount}
			/>

			<Layout.Footer>
				<div className="ygi:flex ygi:gap-3 ygi:px-6">
					<Button
						variant="primary"
						width="full"
						onClick={handleShare}
					>
						링크 공유
					</Button>
					<Button variant="primary" width="full" disabled>
						추천 결과 보기
					</Button>
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
