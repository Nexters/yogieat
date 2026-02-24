"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { Toaster } from "#/components/toast";
import { useProceedRecommendResult } from "#/hooks/gathering";
import {
	CompleteView,
	CompleteViewShowResultButton,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";

const PAGE_ID = "의견수합_완료";

export function CompleteViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();

	const { proceed, isPending } = useProceedRecommendResult();

	useEffect(() => {
		if (accessKey) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
				submit_progress: 100,
			});
		}
	}, [accessKey]);

	return (
		<Layout.Root>
			<CompleteView />

			<SubmissionBottomSheet />

			<Layout.Footer>
				<div className="ygi:px-6">
					<CompleteViewShowResultButton
						pageId={PAGE_ID}
						onProceed={proceed}
						isPending={isPending}
					/>
				</div>
			</Layout.Footer>
			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
