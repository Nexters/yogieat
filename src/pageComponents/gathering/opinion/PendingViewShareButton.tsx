"use client";

import { trackShareClick } from "#/components/analytics";
import { Button } from "#/components/button";
import { share } from "#/utils/share";
import { useParams } from "next/navigation";

interface PendingViewShareButtonProps {
	pageId: string;
}

export const PendingViewShareButton = ({
	pageId,
}: PendingViewShareButtonProps) => {
	const { accessKey } = useParams<{ accessKey: string }>();

	const handleShare = () => {
		trackShareClick({ page_id: pageId, share_location: "Footer" });
		const opinionUrl = `${window.location.origin}/gathering/${accessKey}/landing`;
		share({
			title: "함께 갈 맛집, 같이 정해요!",
			text: "[요기잇] 다인원을 위한 맛집 서비스",
			url: opinionUrl,
		});
	};

	return (
		<Button variant="primary" width="full" onClick={handleShare}>
			링크 공유
		</Button>
	);
};
