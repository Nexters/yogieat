import { queryOptions } from "@tanstack/react-query";

import { recommendResultKeys } from "./queryKey";
import { getRecommendResult } from "./api";

/**
 * recommend-result API QueryOption 관리
 */
export const recommendResultOptions = {
	detail: (accessKey: string) =>
		queryOptions({
			queryKey: recommendResultKeys.detail(accessKey),
			queryFn: () => getRecommendResult(accessKey),
			select: (response) => response.data,
		}),
};
