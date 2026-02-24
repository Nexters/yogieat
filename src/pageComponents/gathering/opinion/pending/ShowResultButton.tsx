"use client";

import { useParams } from "next/navigation";

import { Button } from "#/components/button";
import { Spinner } from "#/components/spinner";
import { useGetGatheringCapacity } from "#/hooks/apis/gathering";

interface ShowResultButtonProps {
	onProceed: () => void;
	isPending: boolean;
}

export const ShowResultButton = ({
	onProceed,
	isPending,
}: ShowResultButtonProps) => {
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
