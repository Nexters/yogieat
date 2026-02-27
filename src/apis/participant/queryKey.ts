/**
 * 참가자 관련 Query/Mutation Key Factory
 */
export const participantKeys = {
	all: ["participant"] as const,
	create: () => [...participantKeys.all, "create"] as const,
	validateNickname: () =>
		[...participantKeys.all, "validateNickname"] as const,
};
