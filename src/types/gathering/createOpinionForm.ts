import { DistanceRange } from "./distance";
import { PreferredCategory } from "./preferredMenu";
import { Category } from "#/constants/gathering/opinion";

export interface OpinionForm {
	nickname: string;
	distanceRange: DistanceRange;
	dislikedCategories: Category[];
	preferredCategories: PreferredCategory;
}

export type OpinionStep = "nickname" | "distance" | "dislike" | "preference";
