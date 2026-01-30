import { FoodCategory } from "./foodCategory";

export type RankKey = "first" | "second" | "third";

export type PreferredMenu = Partial<Record<RankKey, FoodCategory>>;
