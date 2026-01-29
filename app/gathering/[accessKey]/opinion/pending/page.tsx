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
	const { accessKey } = useParams<{ accessKey: string }>();

	const totalCount = 5;
	const submittedCount = 3;

	const isComplete = submittedCount >= totalCount;
	if (isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	return (
		<Layout.Root>
			<PendingView />

			<SubmissionBottomSheet
				totalCount={totalCount}
				submittedCount={submittedCount}
			/>

			<Layout.Footer>
				<div className="ygi:px-6">
					<Button variant="primary" width="full" disabled>
						추천 결과 보기
					</Button>
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
