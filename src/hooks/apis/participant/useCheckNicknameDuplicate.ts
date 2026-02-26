import { useMutation } from "@tanstack/react-query";

import { participantOptions } from "#/apis/participant";

/**
 * 닉네임 중복 확인 mutation hook
 */
export const useCheckNicknameDuplicate = () => {
	return useMutation(participantOptions.checkDuplicate());
};
