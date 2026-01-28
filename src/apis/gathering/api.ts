import { apiClient } from "#/utils/api";

import type { CreateGatheringRequest, CreateGatheringResponse } from "./type";

/**
 * 모임 생성 API
 */
export const createGathering = (request: CreateGatheringRequest) => {
	return apiClient.post<CreateGatheringResponse, CreateGatheringRequest>(
		"gatherings",
		request,
	);
};
