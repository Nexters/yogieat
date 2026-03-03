import { Category } from "#/constants/gathering/opinion";

import { DistanceRange } from "./distance";
import { PreferredCategory } from "./preferredMenu";

export interface OpinionForm {
	nickname: string;
	distanceRange: DistanceRange;
	dislikedCategories: Category[];
	preferredCategories: PreferredCategory;
}

export type OpinionStep = "nickname" | "distance" | "dislike" | "preference";
