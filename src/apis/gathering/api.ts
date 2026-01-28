import { apiClient } from "#/utils/api";

import type {
	CreateGatheringRequest,
	CreateGatheringResponse,
	GetGatheringResponse,
} from "./type";

/**
 * 모임 생성 API
 */
export const createGathering = (request: CreateGatheringRequest) => {
	return apiClient.post<CreateGatheringResponse, CreateGatheringRequest>(
		"gatherings",
		request,
	);
};

/**
 * 모임 단건 조회 API
 * @param accessKey 모임 접근키
 */
export const getGathering = (accessKey: string) => {
	return apiClient.get<GetGatheringResponse>(`gatherings/${accessKey}`);
};
