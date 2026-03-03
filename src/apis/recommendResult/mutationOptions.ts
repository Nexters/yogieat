import { mutationOptions } from "@tanstack/react-query";

import { postProcessRecommendResult } from "./api";
import { recommendResultMutationKeys } from "./mutationKey";

/**
 * 추천 결과 API MutationOption 관리
 */
export const recommendResultMutationOptions = {
	proceed: (accessKey: string) =>
		mutationOptions({
			mutationKey: recommendResultMutationKeys.proceed(accessKey),
			mutationFn: postProcessRecommendResult,
		}),
};
