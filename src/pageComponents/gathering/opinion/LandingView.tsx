"use client";

import { redirect, useParams, useRouter } from "next/navigation";

import { IntroStep } from "#/pageComponents/gathering/opinion";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	useGetGathering,
	useGetGatheringCapacity,
} from "#/hooks/apis/gathering";

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
		router.push(`/gathering/${accessKey}/opinion`);
	};

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
					<Button variant="primary" width="full" onClick={handleStartOpinion}>
						내 취향 입력
					</Button>
				</div>
			</Layout.Footer>
		</>
	);
}
