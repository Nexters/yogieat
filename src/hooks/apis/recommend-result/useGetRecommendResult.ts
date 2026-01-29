import { useSuspenseQuery } from "@tanstack/react-query";

import { recommendResultOptions } from "#/apis/recommend-result";

/**
 * 추천 결과 조회 query hook
 */
export const useGetRecommendResult = (accessKey: string) => {
	return useSuspenseQuery(recommendResultOptions.detail(accessKey));
};
