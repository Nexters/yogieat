import { queryOptions } from "@tanstack/react-query";

import { gatheringKeys } from "./queryKey";
import { createGathering, getGathering, getGatheringCapacity } from "./api";
import type { CreateGatheringRequest } from "./type";

/**
 * 모임 관련 Query/Mutation Options Factory
 */
export const gatheringOptions = {
	create: () => ({
		mutationKey: gatheringKeys.create(),
		mutationFn: (request: CreateGatheringRequest) =>
			createGathering(request),
	}),

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
