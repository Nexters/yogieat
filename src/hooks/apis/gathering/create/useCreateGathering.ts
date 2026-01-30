import { useMutation } from "@tanstack/react-query";

import { gatheringMutationOptions } from "#/apis/gathering";

/**
 * 모임 생성 mutation hook
 */
export const useCreateGathering = () => {
	return useMutation(gatheringMutationOptions.create());
};
