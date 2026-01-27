import type { RankKey } from "#/types/gathering";

export const RANKS: RankKey[] = ["first", "second", "third"];

export const RANK_LABELS: Record<RankKey, string> = {
	first: "1순위",
	second: "2순위",
	third: "3순위",
};
