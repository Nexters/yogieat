import { useSuspenseQuery } from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";

/**
 * 모임 조회 query hook
 */
export const useGetGathering = (accessKey: string) => {
	return useSuspenseQuery({
		...gatheringQueryOptions.detail(accessKey),
		select: (response) => response.data,
	});
};
