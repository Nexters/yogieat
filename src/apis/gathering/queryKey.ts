/**
 * 모임 관련 Query/Mutation Key Factory
 */
export const gatheringKeys = {
	all: ["gathering"] as const,
	create: () => [...gatheringKeys.all, "create"] as const,
	detail: (accessKey: string) =>
		[...gatheringKeys.all, accessKey, "detail"] as const,
	capacity: (accessKey: string) =>
		[...gatheringKeys.all, accessKey, "capacity"] as const,
};
