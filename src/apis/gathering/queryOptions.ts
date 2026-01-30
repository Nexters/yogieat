import { queryOptions } from "@tanstack/react-query";

import { gatheringKeys } from "./queryKey";
import { getGathering, getGatheringCapacity } from "./api";

/**
 * 모임 관련 Query Options Factory
 */
export const gatheringQueryOptions = {
	detail: (accessKey: string) =>
		queryOptions({
			queryKey: gatheringKeys.detail(accessKey),
			queryFn: () => getGathering(accessKey),
		}),
	capacity: (accessKey: string) =>
		queryOptions({
			queryKey: gatheringKeys.capacity(accessKey),
			queryFn: () => getGatheringCapacity(accessKey),
		}),
};
