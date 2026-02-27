import { useMutation } from "@tanstack/react-query";

import { participantOptions } from "#/apis/participant";

/**
 * 닉네임 사전 검증 mutation hook
 */
export const useValidateNickname = () => {
	return useMutation(participantOptions.validateNickname());
};
