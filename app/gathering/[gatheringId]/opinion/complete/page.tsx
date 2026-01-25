"use client";

import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	CompleteView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";

export default function OpinionCompletePage() {
	const totalCount = 5;
	const submittedCount = 2;

	const isComplete = submittedCount >= totalCount;

	return (
		<Layout.Root background="gray">
			<CompleteView
				totalCount={totalCount}
				submittedCount={submittedCount}
			/>
			<SubmissionBottomSheet
				totalCount={totalCount}
				submittedCount={submittedCount}
			/>
			<Layout.Footer background="gray">
				<div className="ygi:px-6">
					<Button
						variant="primary"
						width="full"
						disabled={!isComplete}
					>
						추천 결과 보기
					</Button>
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
