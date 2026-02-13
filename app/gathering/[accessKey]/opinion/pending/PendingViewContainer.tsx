"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, redirect, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { trackViewPage, trackShareClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { share } from "#/utils/share";
import { Toaster } from "#/components/toast";
import { type ParticipantCountEvent, useServerSentEvent } from "#/hooks/sse";
import { gatheringKeys } from "#/apis/gathering";

const PAGE_ID = "의견수합_대기";

export function PendingViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();
	const queryClient = useQueryClient();

	const [currentCount, setCurrentCount] = useState<number | null>(null);
	const [maxCount, setMaxCount] = useState<number | null>(null);

	const { data: capacityFallback } = useGetGatheringCapacity(accessKey);

	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const url = `${baseUrl}/api/v1/gatherings/${accessKey}/subscribe`;

	useServerSentEvent({
		url,
		events: {
			"participant-count": (e: MessageEvent) => {
				const data: ParticipantCountEvent = JSON.parse(e.data);

				setCurrentCount(data.currentCount);
				setMaxCount(data.maxCount);

				queryClient.setQueryData(gatheringKeys.capacity(accessKey), {
					data: {
						currentCount: data.currentCount,
						maxCount: data.maxCount,
					},
				});
			},
			"gathering-full": () => {
				router.push(`/gathering/${accessKey}/opinion/complete`);
			},
		},
	});

	const capacity = useMemo(
		() => ({
			currentCount: currentCount ?? capacityFallback.currentCount,
			maxCount: maxCount ?? capacityFallback.maxCount,
		}),
		[currentCount, maxCount, capacityFallback],
	);

	const isComplete = capacity.currentCount >= capacity.maxCount;

	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleShare = () => {
		trackShareClick({ page_id: PAGE_ID, share_location: "Footer" });

		const opinionUrl = `${window.location.origin}/gathering/${accessKey}/landing`;
		share({
			title: "함께 갈 맛집, 같이 정해요!",
			text: "[요기잇] 다인원을 위한 맛집 서비스",
			url: opinionUrl,
		});
	};

	useEffect(() => {
		if (!isComplete && capacity) {
			const progress = Math.round(
				(capacity.currentCount / capacity.maxCount) * 100,
			);

			trackViewPage({
				page_id: PAGE_ID,
				submit_progress: progress,
			});
		}
	}, [capacity, isComplete]);

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
