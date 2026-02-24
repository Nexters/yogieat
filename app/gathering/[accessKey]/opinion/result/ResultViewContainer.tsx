"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { trackViewPage, trackShareClick } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { ResultView } from "#/pageComponents/gathering/opinion";
import { BackwardButton } from "#/components/backwardButton";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";
import { Toaster } from "#/components/toast";

const PAGE_ID = "추천_결과";

export function ResultViewContainer() {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: recommendationResult } = useGetRecommendResult(accessKey);

	const handleClickBackward = () => {
		router.push(`/gathering/${accessKey}/opinion/complete`);
	};

	const handleShare = () => {
		trackShareClick({ page_id: PAGE_ID, share_location: "Footer" });
	};

	useEffect(() => {
		if (recommendationResult && accessKey) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
			});
		}
	}, [recommendationResult, accessKey]);

	return (
		<Layout.Root>
			<Layout.Header background="gray">
				<BackwardButton onClick={handleClickBackward} />
			</Layout.Header>

			<ResultView recommendationResult={recommendationResult} />

			<Layout.Footer background="gray">
				<div className="ygi:px-6">
					<ShareButton onShare={handleShare} />
				</div>
			</Layout.Footer>

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
