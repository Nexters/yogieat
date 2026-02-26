import { apiClient } from "#/utils/api";

import type {
	CreateParticipantRequest,
	CreateParticipantResponse,
	CheckNicknameDuplicateRequest,
	CheckNicknameDuplicateResponse,
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
 * 닉네임 중복 확인 API
 * TODO: 서버 준비 완료 후 실제 엔드포인트 및 응답 구조 확인 필요
 */
export const checkNicknameDuplicate = (
	request: CheckNicknameDuplicateRequest,
) => {
	return apiClient.get<CheckNicknameDuplicateResponse>(
		`gatherings/${request.accessKey}/participants/check-nickname`,
		{ searchParams: { nickname: request.nickname } },
	);
};
