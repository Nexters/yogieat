"use client";

import { useEffect } from "react";
import { useParams, redirect } from "next/navigation";

import { trackPageView, trackShareClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { share } from "#/utils/share";
import { Toaster } from "#/components/toast";

const PAGE_ID = "의견수합_대기";

export function PendingViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: capacity } = useGetGatheringCapacity(accessKey);

	const isComplete = capacity.currentCount >= capacity.maxCount;

	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleShare = () => {
		trackShareClick({ page_id: PAGE_ID, share_location: "Footer" });

		const opinionUrl = `${window.location.origin}/gathering/${accessKey}/opinion`;
		share({
			title: "함께 갈 맛집, 같이 정해요!",
			text: "[요기잇] 다인원을 위한 맛집 서비스",
			url: opinionUrl,
		});
	};

	useEffect(() => {
		if (!isComplete && capacity?.currentCount && capacity?.maxCount) {
			const progress = Math.round(
				(capacity.currentCount / capacity.maxCount) * 100,
			);

			trackPageView("view_page", {
				page_id: PAGE_ID,
				submit_progress: progress,
			});
		}
	}, [isComplete, capacity?.currentCount, capacity?.maxCount]);

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

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
