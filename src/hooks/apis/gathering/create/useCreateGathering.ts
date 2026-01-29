import { useMutation } from "@tanstack/react-query";

import { gatheringOptions } from "#/apis/gathering";

/**
 * 모임 생성 mutation hook
 */
export const useCreateGathering = () => {
	return useMutation(gatheringOptions.create());
};
