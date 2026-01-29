import { apiClient } from "#/utils/api";

import type {
	CreateGatheringRequest,
	CreateGatheringResponse,
	GatheringCapacityResponse,
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
};
