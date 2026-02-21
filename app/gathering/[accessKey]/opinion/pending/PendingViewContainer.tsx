"use client";

import { useEffect, useMemo, useState } from "react";
import { redirect } from "next/navigation";

import { trackViewPage, trackShareClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { Toaster } from "#/components/toast";
import { useServerSentEvent } from "#/hooks/sse";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { share } from "#/utils/share";
import { participantCountSchema } from "#/schemas/sse/participantCount.schema";

const PAGE_ID = "의견수합_대기";

interface PendingViewContainerProps {
	accessKey: string;
	initialMaxCount: number;
	initialCurrentCount: number;
}

export function PendingViewContainer({
	accessKey,
	initialMaxCount,
	initialCurrentCount,
}: PendingViewContainerProps) {
	const [currentCount, setCurrentCount] =
		useState<number>(initialCurrentCount);
	const [maxCount, setMaxCount] = useState<number>(initialMaxCount);

	const eventHandlers = useMemo(
		() => ({
			"participant-count": (event: MessageEvent) => {
				const { data, success } =
					participantCountSchema.safeParse(event);

				// TODO : 응답이 유효하지 않을 경우에 대한 후속 에러 조치 시행 필요
				if (success) {
					setCurrentCount(data.currentCount);
					setMaxCount(data.maxCount);
				}
			},
			"gathering-full": () => {
				redirect(`/gathering/${accessKey}/opinion/complete`);
			},
		}),
		[accessKey],
	);

	useServerSentEvent({
		url: `/gatherings/${accessKey}/subscribe`,
		events: eventHandlers,
	});

	const capacity = useMemo(
		() => ({
			currentCount,
			maxCount,
		}),
		[currentCount, maxCount],
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
		if (capacity && accessKey) {
			const progress = Math.round(
				(capacity.currentCount / capacity.maxCount) * 100,
			);

			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
				submit_progress: progress,
			});
		}
	}, [capacity, accessKey]);

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
