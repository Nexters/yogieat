"use client";

import { useParams, useRouter } from "next/navigation";

import { trackCtaClick } from "#/components/analytics";
import { Button } from "#/components/button";

const PAGE_ID = "의견수합_랜딩";

export const OpinionStartButton = () => {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();

	const handleStartOpinion = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "내 취향 입력" });
		router.push(`/gathering/${accessKey}/opinion`);
	};

	return (
		<Button variant="primary" width="full" onClick={handleStartOpinion}>
			내 취향 입력
		</Button>
	);
};
