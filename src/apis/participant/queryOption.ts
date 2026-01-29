import { participantKeys } from "./queryKey";
import { createParticipant } from "./api";
import type { CreateParticipantRequest } from "./type";
import { mutationOptions } from "@tanstack/react-query";

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
};
