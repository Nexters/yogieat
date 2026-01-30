import { useSuspenseQuery } from "@tanstack/react-query";

import { gatheringOptions } from "#/apis/gathering";

/**
 * 모임 조회 query hook
 */
export const useGetGathering = (accessKey: string) => {
	return useSuspenseQuery({
		...gatheringOptions.detail(accessKey),
		select: (response) => response.data,
	});
};
