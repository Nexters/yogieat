import { queryOptions } from "@tanstack/react-query";

import { getRecommendResult } from "./api";
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
};
