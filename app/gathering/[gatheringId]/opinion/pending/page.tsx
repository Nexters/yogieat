"use client";

import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	PendingView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function OpinionPendingPage() {
	const params = useParams();
	const gatheringId = params.gatheringId as string;

	// TODO: API 연동 시 실제 데이터로 교체
	const totalCount = 5;
	const submittedCount = 3;

	const isComplete = submittedCount >= totalCount;
	if (isComplete) {
		redirect(`/gathering/${gatheringId}/opinion/complete`);
	}

	return (
		<Layout.Root>
			<PendingView />

			<SubmissionBottomSheet
				totalCount={totalCount}
				submittedCount={submittedCount}
			/>

			<Layout.Footer background="gray">
				<div className="ygi:px-6">
					<Button variant="primary" width="full" disabled>
						추천 결과 보기
					</Button>
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
