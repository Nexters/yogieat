"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { gatheringKeys } from "#/apis/gathering";
import { trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { useProceedRecommendResult } from "#/hooks/gathering";
import { useServerSentEvent } from "#/hooks/sse";
import {
	PendingView,
	PendingViewShareButton,
	PendingViewShowResultButton,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { participantCountSchema } from "#/schemas/sse";
import { Toaster } from "#/components/toast";

const PAGE_ID = "의견수합_대기";

export function PendingViewContainer() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { accessKey } = useParams<{ accessKey: string }>();

	const { proceed, isPending } = useProceedRecommendResult();

	const {
		data: { currentCount, maxCount },
	} = useGetGatheringCapacity(accessKey);

	const eventHandlers = useMemo(
		() => ({
			"participant-count": (event: MessageEvent) => {
				const { data: updatedCapacity, success } =
					participantCountSchema.safeParse(JSON.parse(event.data));

				if (success) {
					queryClient.setQueryData(
						gatheringKeys.capacity(accessKey),
						{
							data: updatedCapacity,
						},
					);
				}
			},
			"gathering-full": () => {
				router.push(`/gathering/${accessKey}/opinion/complete`);
			},
		}),
		[accessKey, router, queryClient],
	);

	useServerSentEvent({
		url: `/gatherings/${accessKey}/subscribe`,
		events: eventHandlers,
	});

	useEffect(() => {
		if (accessKey) {
			const progress = Math.round((currentCount / maxCount) * 100);

			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
				submit_progress: progress,
			});
		}
	}, [accessKey, currentCount, maxCount]);

	return (
		<Layout.Root>
			<PendingView />

			<SubmissionBottomSheet />

			<Layout.Footer>
				<div className="ygi:flex ygi:gap-3 ygi:px-6">
					<PendingViewShareButton pageId={PAGE_ID} />
					<PendingViewShowResultButton
						onProceed={proceed}
						isPending={isPending}
					/>
				</div>
			</Layout.Footer>

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
