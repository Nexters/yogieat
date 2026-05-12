/**
 * 지역 관련 Query Key Factory
 */
export const regionKeys = {
	all: ["region"] as const,
	list: () => [...regionKeys.all, "list"] as const,
};
