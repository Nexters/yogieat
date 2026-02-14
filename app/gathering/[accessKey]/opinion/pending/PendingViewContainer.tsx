"use client";

import { useEffect, useMemo, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { isNil } from "es-toolkit";

import { trackViewPage, trackShareClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { Toaster } from "#/components/toast";
import { type ParticipantCountMessage, useServerSentEvent } from "#/hooks/sse";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { share } from "#/utils/share";

const PAGE_ID = "의견수합_대기";

export function PendingViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();

	const [currentCount, setCurrentCount] = useState<number | null>(null);
	const [maxCount, setMaxCount] = useState<number | null>(null);

	useServerSentEvent({
		url: `/gatherings/${accessKey}/subscribe`,
		events: {
			"participant-count": (event: MessageEvent) => {
				const message = JSON.parse(
					event.data,
				) as ParticipantCountMessage;
				setCurrentCount(message.currentCount);
				setMaxCount(message.maxCount);
			},
			"gathering-full": () => {
				redirect(`/gathering/${accessKey}/opinion/complete`);
			},
		},
	});

	const { data: capacityFallback } = useGetGatheringCapacity({
		accessKey,
		enabled: isNil(currentCount) || isNil(maxCount),
	});

	const capacity = useMemo(
		() => ({
			currentCount: currentCount ?? capacityFallback?.currentCount ?? 0,
			maxCount: maxCount ?? capacityFallback?.maxCount ?? 0,
		}),
		[
			capacityFallback?.currentCount,
			capacityFallback?.maxCount,
			currentCount,
			maxCount,
		],
	);

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
		if (capacity) {
			const progress = Math.round(
				(capacity.currentCount / capacity.maxCount) * 100,
			);

			trackViewPage({
				page_id: PAGE_ID,
				submit_progress: progress,
			});
		}
	}, [capacity]);

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
