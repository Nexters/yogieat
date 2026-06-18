import { queryOptions } from "@tanstack/react-query";

import { getRecommendResult, getRecommendResultV2 } from "./api";
import { recommendResultKeys } from "./queryKey";

/**
 * recommend-result API QueryOption 관리
 */
export const recommendResultOptions = {
	detail: (accessKey: string) =>
		queryOptions({
			queryKey: recommendResultKeys.detail(accessKey),
			queryFn: () => getRecommendResult(accessKey),
		}),
	restaurantList: (accessKey: string) =>
		queryOptions({
			queryKey: recommendResultKeys.restaurantList(accessKey),
			queryFn: () => getRecommendResultV2(accessKey),
		}),
};
