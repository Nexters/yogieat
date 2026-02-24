/**
 * 추천 결과 Mutation Key Factory
 */
export const recommendResultMutationKeys = {
	all: ["recommendResult"],
	proceed: (accessKey: string) =>
		[...recommendResultMutationKeys.all, "proceed", accessKey] as const,
};
