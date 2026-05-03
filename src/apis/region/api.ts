import { apiClient } from "#/utils/api";

import type { GetRegionsResponse } from "./type";

/**
 * 지역 목록 조회 API
 */
export const getRegions = () => {
	return apiClient.get<GetRegionsResponse>("regions");
};
