import { mutationOptions } from "@tanstack/react-query";

import { gatheringKeys } from "./queryKey";
import { createGathering } from "./api";

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
