import { mutationOptions } from "@tanstack/react-query";

import { createGathering } from "./api";
import { gatheringKeys } from "./queryKey";

/**
 * 모임 관련 Mutation Options Factory
 */
export const gatheringMutationOptions = {
	create: () =>
		mutationOptions({
			mutationKey: gatheringKeys.create(),
			mutationFn: createGathering,
		}),
};
