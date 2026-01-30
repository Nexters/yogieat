import { useSuspenseQuery } from "@tanstack/react-query";

import { gatheringOptions } from "#/apis/gathering";

/**
 * 모임 참여자 현황 조회 query hook
 * - 10초마다 자동으로 refetch
 */
export const useGetGatheringCapacity = (accessKey: string) => {
	return useSuspenseQuery({
		...gatheringOptions.capacity(accessKey),
		select: (response) => response.data,
		refetchInterval: 1000 * 10,
	});
};
