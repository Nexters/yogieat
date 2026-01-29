import { apiClient } from "#/utils/api";

import type {
	CreateGatheringRequest,
	CreateGatheringResponse,
	GatheringCapacityResponse,
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
 * 모임 참여자 현황 조회 API
 */
export const getGatheringCapacity = (accessKey: string) => {
	return apiClient.get<GatheringCapacityResponse>(
		`gatherings/${accessKey}/capacity`,
	);
}

/**
 * 모임 단건 조회 API
 */
export const getGathering = (accessKey: string) => {
	return apiClient.get<GetGatheringResponse>(`gatherings/${accessKey}`);
};
