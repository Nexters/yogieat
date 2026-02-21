import { Category, DistanceRange } from "#/constants/gathering/opinion";
import { PreferredCategory } from "./preferredCategory";

export interface OpinionForm {
	nickname: string;
	distanceRange: DistanceRange;
	dislikedCategories: Category[];
	preferredCategories: PreferredCategory;
}

export type OpinionStep = "nickname" | "distance" | "dislike" | "preference";
