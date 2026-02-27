import { mutationOptions } from "@tanstack/react-query";

import { participantKeys } from "./queryKey";
import { createParticipant, validateNickname } from "./api";
import type {
	CreateParticipantRequest,
	ValidateNicknameRequest,
} from "./type";

/**
 * 참가자 관련 Query/Mutation Options Factory
 */
export const participantOptions = {
	create: () =>
		mutationOptions({
			mutationKey: participantKeys.create(),
			mutationFn: (request: CreateParticipantRequest) =>
				createParticipant(request),
		}),
	validateNickname: () =>
		mutationOptions({
			mutationKey: participantKeys.validateNickname(),
			mutationFn: (request: ValidateNicknameRequest) =>
				validateNickname(request),
		}),
};
