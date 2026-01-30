/**
 * recommend-result API QueryKey 관리
 */
export const recommendResultKeys = {
	all: ["recommendResult"] as const,
	detail: (accessKey: string) =>
		[...recommendResultKeys.all, accessKey] as const,
};
