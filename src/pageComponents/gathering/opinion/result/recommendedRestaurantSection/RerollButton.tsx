"use client";

import { Button } from "#/components/button";
import { Spinner } from "#/components/spinner";

interface RerollButtonProps {
	isMaxReached: boolean;
	isPending: boolean;
	onReroll: () => void;
}

export const RerollButton = ({
	isMaxReached,
	isPending,
	onReroll,
}: RerollButtonProps) => {
	return (
		<Button
			variant={isMaxReached ? "tertiary" : "secondary"}
			width="full"
			disabled={isMaxReached || isPending}
			onClick={onReroll}
		>
			{isPending ? (
				<Spinner size="small" />
			) : isMaxReached ? (
				"맛집 더 보기 횟수를 모두 사용했어요"
			) : (
				"다른 맛집 더 보기"
			)}
		</Button>
	);
};
