import { useSuspenseQuery } from "@tanstack/react-query";

import { gatheringOptions } from "#/apis/gathering";

/**
 * 모임 참여자 현황 조회 query hook
 */
export const useGetGatheringCapacity = (accessKey: string) => {
	return useSuspenseQuery(gatheringOptions.capacity(accessKey));
};
