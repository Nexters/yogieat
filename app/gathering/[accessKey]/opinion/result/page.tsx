"use client";

import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { ResultView } from "#/pageComponents/gathering/opinion";
import { MOCK_RECOMMENDATION_RESULT } from "#/constants/gathering/opinion/mockResults";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import { BackwardButton } from "#/components/backwardButton";

export default function OpinionResultPage() {
	const { accessKey } = useParams<{ accessKey: string }>();

	const maxCount = 5;
	const currentCount = 5;

	const isComplete = currentCount >= maxCount;

	if (!isComplete) {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	}

	const handleClickBackward = () => {
		redirect(`/gathering/${accessKey}/opinion/complete`);
	};

	return (
		<Layout.Root>
			<Layout.Header background="gray">
				<BackwardButton onClick={handleClickBackward} />
			</Layout.Header>
			<ResultView recommendationResult={MOCK_RECOMMENDATION_RESULT} />

			<Layout.Footer background="gray">
				<div className="ygi:mt-auto ygi:px-6 ygi:pt-4">
					<ShareButton disabled={false} />
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
