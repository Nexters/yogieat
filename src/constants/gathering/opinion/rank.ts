export enum RankKey {
	FIRST = "first",
	SECOND = "second",
	THIRD = "third",
}
export const RANK_LABEL = {
	[RankKey.FIRST]: "1순위",
	[RankKey.SECOND]: "2순위",
	[RankKey.THIRD]: "3순위",
} as const;

export const RANK_LIST: RankKey[] = [
	RankKey.FIRST,
	RankKey.SECOND,
	RankKey.THIRD,
];
