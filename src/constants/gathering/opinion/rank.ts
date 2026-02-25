export const RANK = {
	FIRST: "first",
	SECOND: "second",
	THIRD: "third",
} as const;

export type RankKey = typeof RANK[keyof typeof RANK];

export const RANK_LIST: ReadonlyArray<RankKey> = [
	RANK.FIRST,
	RANK.SECOND,
	RANK.THIRD,
] as const;

export const RANK_LABEL: Record<RankKey, string> = {
	first: "1순위",
	second: "2순위",
	third: "3순위",
};
