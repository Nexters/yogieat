import { useMutation } from "@tanstack/react-query";

import { recommendResultMutationOptions } from "#/apis/recommendResult";

/**
 * 과반수 이상 의견 등록 시 추천 결과 생성하도록 하는 Mutation Hook
 */
export const usePostProceedRecommendResult = (accessKey: string) => {
	return useMutation(recommendResultMutationOptions.proceed(accessKey));
};
