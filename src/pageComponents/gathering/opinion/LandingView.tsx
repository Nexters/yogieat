"use client";

import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { trackCtaClick, trackPageView } from "#/components/analytics";
import { IntroStep } from "#/pageComponents/gathering/opinion";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	useGetGathering,
	useGetGatheringCapacity,
} from "#/hooks/apis/gathering";

const PAGE_ID = "의견수합_랜딩";

export function LandingView() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const { data: capacity } = useGetGatheringCapacity(accessKey);
	const { data: gathering } = useGetGathering(accessKey);

	const isComplete = capacity.currentCount >= capacity.maxCount;

	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleStartOpinion = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "내 취향 입력" });
		router.push(`/gathering/${accessKey}/opinion`);
	};

	useEffect(() => {
		if (!isComplete && gathering?.accessKey) {
			trackPageView("view_landing", {
				page_id: PAGE_ID,
				group_id: gathering.accessKey,
			});
		}
	}, [isComplete, gathering?.accessKey]);

	return (
		<>
			<Layout.Header background="gray">
				<div className="ygi:h-full ygi:w-full" />
			</Layout.Header>
			<Layout.Content background="gray">
				<IntroStep scheduledDate={gathering.scheduledDate} />
			</Layout.Content>
			<Layout.Footer background="gray">
				<div className="ygi:py-auto ygi:px-6">
					<Button
						variant="primary"
						width="full"
						onClick={handleStartOpinion}
					>
						내 취향 입력
					</Button>
				</div>
			</Layout.Footer>
		</>
	);
}
