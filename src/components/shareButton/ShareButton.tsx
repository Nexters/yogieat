"use client";

import { Button, type ButtonProps } from "#/components/button";
import { share } from "#/utils/share";

export interface ShareButtonProps extends Omit<ButtonProps, "onClick"> {
	gatheringId: string;
}

export const ShareButton = ({
	gatheringId,
	disabled,
	...props
}: ShareButtonProps) => {
	const handleShare = async () => {
		const url = `${window.location.origin}/gathering/${gatheringId}/opinion/result`;
		await share({
			title: "요기잇 맛집 추천 결과",
			text: "우리 모임의 추천 결과를 확인해보세요!",
			url,
		});
	};

	return (
		<Button
			variant="primary"
			width="full"
			onClick={handleShare}
			disabled={disabled}
			{...props}
		>
			공유하기
		</Button>
	);
};
