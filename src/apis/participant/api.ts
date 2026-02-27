import { apiClient } from "#/utils/api";

import type {
	CreateParticipantRequest,
	CreateParticipantResponse,
	ValidateNicknameRequest,
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

/**
 * 닉네임 사전 검증 API
 * 중복 시 에러 코드 P006(DUPLICATE_NICKNAME) throw
 */
export const validateNickname = (request: ValidateNicknameRequest) => {
	return apiClient.post<null, ValidateNicknameRequest>(
		"participants/nickname/validation",
		request,
	);
};
