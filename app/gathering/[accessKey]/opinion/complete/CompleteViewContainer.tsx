"use client";

import { useEffect } from "react";
import { useParams, redirect } from "next/navigation";

import { trackCtaClick, trackViewPage } from "#/components/analytics";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	CompleteView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";
import { Toaster } from "#/components/toast";

const PAGE_ID = "의견수합_완료";

export function CompleteViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: capacity } = useGetGatheringCapacity(accessKey);

	const isPending = capacity.currentCount < capacity.maxCount;

	if (isPending) {
		redirect(`/gathering/${accessKey}/opinion/pending`);
	}

	const handleRedirectResult = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "추천 결과 보기" });
		redirect(`/gathering/${accessKey}/opinion/result`);
	};

	useEffect(() => {
		if (capacity && accessKey) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
				submit_progress: Math.round(
					(capacity.currentCount / capacity.maxCount) * 100,
				),
			});
		}
	}, [capacity, accessKey]);

	return (
		<Layout.Root>
			<CompleteView />

			<SubmissionBottomSheet
				maxCount={capacity.maxCount}
				currentCount={capacity.currentCount}
			/>

			<Layout.Footer>
				<div className="ygi:px-6">
					<Button
						variant="primary"
						width="full"
						onClick={handleRedirectResult}
					>
						추천 결과 보기
					</Button>
				</div>
			</Layout.Footer>
			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
