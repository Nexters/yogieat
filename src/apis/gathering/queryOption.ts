import { gatheringKeys } from "./queryKey";
import { createGathering } from "./api";
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
};
