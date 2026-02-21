import { Category, RankKey } from "#/constants/gathering/opinion";

export type PreferredCategory = Partial<Record<RankKey, Category>>;
