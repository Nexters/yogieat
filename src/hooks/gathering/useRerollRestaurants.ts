"use client";

import { useMutationState } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { recommendResultMutationKeys } from "#/apis/recommendResult";
import type { RerollRecommendResultResponse } from "#/apis/recommendResult";
import { useRerollRecommendResult } from "#/hooks/apis/recommendResult";
import type { Restaurant } from "#/types/gathering";
import type { ApiResponse } from "#/utils/api/types";

interface UseRerollRestaurantsProps {
	accessKey: string;
	initialList: Restaurant[];
	maxRerollCount: number;
}

export const useRerollRestaurants = ({
	accessKey,
	initialList,
	maxRerollCount,
}: UseRerollRestaurantsProps) => {
	const { mutate, isPending } = useRerollRecommendResult(accessKey);

	// 성공한 reroll 결과 이력을 TanStack Query 캐시에서 직접 읽음
	// → isMaxReached 가 isPending 과 동일 렌더 사이클에서 업데이트되어 race condition 없음
	const successfulRerolls = useMutationState({
		filters: {
			mutationKey: recommendResultMutationKeys.reroll(accessKey),
			status: "success",
		},
		select: (mutation) =>
			mutation.state.data as ApiResponse<RerollRecommendResultResponse>,
	});

	const isMaxReached = successfulRerolls.length >= maxRerollCount;

	const displayList = useMemo(
		() => [
			...initialList,
			...successfulRerolls.flatMap((result) => result.data.list),
		],
		[initialList, successfulRerolls],
	);

	const handleReroll = useCallback(() => {
		if (isMaxReached || isPending) return;

		const excludedIds = displayList.map((r) => r.restaurantId);
		mutate({ accessKey, restaurantIds: excludedIds });
	}, [accessKey, displayList, isMaxReached, isPending, mutate]);

	return {
		displayList,
		isMaxReached,
		isPending,
		handleReroll,
	};
};
