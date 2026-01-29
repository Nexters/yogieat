import { apiClient } from "#/utils/api";

import type {
	CreateParticipantRequest,
	CreateParticipantResponse,
} from "./type";

/**
 * 모임 참여 API
 */
export const createParticipant = (request: CreateParticipantRequest) => {
	return apiClient.post<CreateParticipantResponse, CreateParticipantRequest>(
		"participants",
		request,
	);
};
