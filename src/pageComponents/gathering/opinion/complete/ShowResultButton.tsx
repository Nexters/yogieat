"use client";

import { useParams } from "next/navigation";

import { trackCtaClick, trackResultViewClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { Spinner } from "#/components/spinner";

interface ShowResultButtonProps {
	pageId: string;
	onProceed: () => void;
	isPending: boolean;
}

export const ShowResultButton = ({
	pageId,
	onProceed,
	isPending,
}: ShowResultButtonProps) => {
	const { accessKey } = useParams<{ accessKey: string }>();

	const handleClickShowResultButton = () => {
		trackCtaClick({ page_id: pageId, button_name: "추천 결과 보기" });
		trackResultViewClick({
			group_id: accessKey,
			submit_progress: 100,
		});
		onProceed();
	};

	return (
		<Button
			variant="primary"
			width="full"
			disabled={isPending}
			onClick={handleClickShowResultButton}
		>
			{isPending ? <Spinner size="small" /> : "추천 결과 보기"}
		</Button>
	);
};
