import { Category } from "#/constants/gathering/opinion";

export type RankKey = "first" | "second" | "third";

export type PreferredCategory = Partial<Record<RankKey, Category>>;
