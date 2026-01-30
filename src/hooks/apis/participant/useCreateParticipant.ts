import { useMutation } from "@tanstack/react-query";

import { participantOptions } from "#/apis/participant";

/**
 * 모임 참여 mutation hook
 */
export const useCreateParticipant = () => {
	return useMutation(participantOptions.create());
};
