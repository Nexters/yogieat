"use client";

import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { ResultView } from "#/pageComponents/gathering/opinion";
import { MOCK_RECOMMENDATION_RESULT } from "#/constants/gathering/opinion/mockResults";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function OpinionResultPage() {
	const params = useParams();
	const gatheringId = params.gatheringId as string;

	const totalCount = 5;
	const submittedCount = 5;

	const isComplete = submittedCount >= totalCount;

	if (!isComplete) {
		redirect(`/gathering/${gatheringId}/opinion/complete`);
	}

	return (
		<Layout.Root>
			<ResultView
				gatheringId={gatheringId}
				recommendationResult={MOCK_RECOMMENDATION_RESULT}
			/>

			<Layout.Footer background="gray">
				<div className="ygi:px-6">
					<ShareButton gatheringId={gatheringId} disabled={false} />
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
