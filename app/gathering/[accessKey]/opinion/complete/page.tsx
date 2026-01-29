"use client";

import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import {
	CompleteView,
	SubmissionBottomSheet,
} from "#/pageComponents/gathering/opinion";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function OpinionCompletePage() {
	const { accessKey } = useParams<{ accessKey: string }>();

	// TODO: API 연동 시 실제 데이터로 교체
	const totalCount = 5;
	const submittedCount = 5;

	const isPending = submittedCount < totalCount;

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
				totalCount={totalCount}
				submittedCount={submittedCount}
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
