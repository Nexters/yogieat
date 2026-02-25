"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";

import { gatheringKeys } from "#/apis/gathering";
import { trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { Toaster } from "#/components/toast";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { useProceedRecommendResult } from "#/hooks/gathering";
import { useServerSentEvent } from "#/hooks/sse";
import { participantCountSchema } from "#/schemas/sse";

import { SubmissionBottomSheet } from "../SubmissionBottomSheet";
import { ShareButton } from "./ShareButton";
import { ShowResultButton } from "./ShowResultButton";

const Player = dynamic(
	() =>
		import("@lottiefiles/react-lottie-player").then(
			(module) => module.Player,
		),
	{ ssr: false },
);

const PAGE_ID = "의견수합_대기";

export function PendingPage() {
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
			<Layout.Content background="gray">
				<div className="ygi:flex ygi:h-full ygi:flex-col ygi:items-center ygi:px-6 ygi:pt-3">
					<StepHeader.Root>
						<StepHeader.Title>
							메뉴 추천을 준비하고 있어요!
						</StepHeader.Title>
						<StepHeader.Description>
							모든 의견이 모이면 추천 결과를 보여드릴게요
						</StepHeader.Description>
					</StepHeader.Root>

					<div className="ygi:item-center ygi:mb-43 ygi:flex ygi:w-full ygi:flex-1 ygi:flex-col ygi:justify-end">
						<Player
							autoplay
							loop
							src="/lotties/opinion-submission.json"
							style={{ width: 280, height: 300 }}
						/>
					</div>
				</div>
			</Layout.Content>

			<SubmissionBottomSheet />

			<Layout.Footer>
				<div className="ygi:flex ygi:gap-3 ygi:px-6">
					<ShareButton pageId={PAGE_ID} />
					<ShowResultButton
						onProceed={proceed}
						isPending={isPending}
					/>
				</div>
			</Layout.Footer>

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
