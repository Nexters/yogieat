/**
 * 모임 관련 Query/Mutation Key Factory
 */
export const gatheringKeys = {
	all: ["gathering"] as const,
	create: () => [...gatheringKeys.all, "create"] as const,
	detail: (accessKey: string) =>
		[...gatheringKeys.all, "detail", accessKey] as const,
	capacity: (accessKey: string) =>
		[...gatheringKeys.all, "capacity", accessKey] as const,
};
