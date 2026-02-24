"use client";

import { Button } from "#/components/button";
import { Spinner } from "#/components/spinner";
import { useParams } from "next/navigation";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";

interface PendingViewShowResultButtonProps {
	onProceed: () => void;
	isPending: boolean;
}

export const PendingViewShowResultButton = ({
	onProceed,
	isPending,
}: PendingViewShowResultButtonProps) => {
	const { accessKey } = useParams<{ accessKey: string }>();

	const {
		data: { currentCount, maxCount },
	} = useGetGatheringCapacity(accessKey);

	const hasReachedMajority = currentCount * 2 >= maxCount;
	const disabled = !hasReachedMajority || isPending;

	return (
		<Button
			variant="primary"
			width="full"
			disabled={disabled}
			onClick={onProceed}
		>
			{isPending ? <Spinner size="small" /> : "추천 결과 보기"}
		</Button>
	);
};
