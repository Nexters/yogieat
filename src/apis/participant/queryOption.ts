import { participantKeys } from "./queryKey";
import { createParticipant } from "./api";
import type { CreateParticipantRequest } from "./type";

/**
 * 참가자 관련 Query/Mutation Options Factory
 */
export const participantOptions = {
	create: () => ({
		mutationKey: participantKeys.create(),
		mutationFn: (request: CreateParticipantRequest) =>
			createParticipant(request),
	}),
};
