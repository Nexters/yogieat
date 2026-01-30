"use client";

import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useParams, redirect } from "next/navigation";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { ShareButton } from "#/components/shareButton";

export default function PendingViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: capacity } = useGetGatheringCapacity(accessKey);

	const isComplete = capacity.currentCount >= capacity.maxCount;
	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	return (
		<Layout.Root>
			<PendingView />

			<SubmissionBottomSheet
				maxCount={capacity.maxCount}
				currentCount={capacity.currentCount}
			/>

			<Layout.Footer>
				<div className="ygi:px-6">
					<ShareButton />
					<Button variant="primary" width="full" disabled>
						추천 결과 보기
					</Button>
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
