"use client";

import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	CompleteView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useParams, redirect } from "next/navigation";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";

export default function CompleteViewContainer() {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: capacity } = useGetGatheringCapacity(accessKey);

	const isPending = capacity.currentCount < capacity.maxCount;

	if (isPending) {
		redirect(`/gathering/${accessKey}/opinion/pending`);
	}

	const handleRedirectResult = () => {
		redirect(`/gathering/${accessKey}/opinion/result`);
	};

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
		</Layout.Root>
	);
}
