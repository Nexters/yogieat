"use client";

import { useEffect } from "react";
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
import { EVENT, useServerSentEventListener } from "#/hooks/sse";

import { SubmissionBottomSheet } from "../SubmissionBottomSheet";
import { ShareButton } from "./ShareButton";
import { ShowResultButton } from "./ShowResultButton";
import { ResultGeneratingPage } from "../result";

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

	useServerSentEventListener(EVENT.PARTICIPANT_COUNT, (payload) => {
		if (payload.currentCount === payload.maxCount) {
			router.push(`/gathering/${accessKey}/opinion/complete`);
		}

		queryClient.setQueryData(gatheringKeys.capacity(accessKey), {
			data: payload,
		});
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

	if (isPending) {
		return (
			<Layout.Root>
				<ResultGeneratingPage />
			</Layout.Root>
		);
	}

	return (
		<Layout.Root>
			<Layout.Content background="gray">
				<div className="ygi:flex ygi:h-full ygi:flex-col ygi:items-center ygi:overflow-hidden ygi:px-6 ygi:pt-3">
					<StepHeader.Root>
						<StepHeader.Title>
							메뉴 추천을 준비하고 있어요!
						</StepHeader.Title>
						<StepHeader.Description>
							모든 의견이 모이면 추천 결과를 보여드릴게요
						</StepHeader.Description>
					</StepHeader.Root>

					{/* 텍스트–일러스트 고정 간격 60px */}
					<div className="ygi:h-15 ygi:shrink-0" />

					{/* 일러스트 컨테이너: 남은 높이 채움, 일러스트는 하단 고정 */}
					<div className="ygi:mb-43 ygi:flex ygi:min-h-0 ygi:flex-1 ygi:items-end ygi:justify-center">
						<div className="ygi:aspect-280/300 ygi:h-full ygi:max-h-75">
							<Player
								autoplay
								loop
								src="/lotties/opinion-submission.json"
								style={{ width: "100%", height: "100%" }}
							/>
						</div>
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
