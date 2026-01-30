import { useSuspenseQuery } from "@tanstack/react-query";

import { recommendResultOptions } from "#/apis/recommendResult";

/**
 * 추천 결과 조회 query hook
 */
export const useGetRecommendResult = (accessKey: string) => {
	return useSuspenseQuery({
		...recommendResultOptions.detail(accessKey),
		select: (response) => response.data,
	});
};
