import { Category } from "#/constants/gathering/opinion";

import { PreferredCategory } from "./preferredMenu";

export interface OpinionForm {
	nickname: string;
	dislikedCategories: Category[];
	preferredCategories: PreferredCategory;
}

export type OpinionStep = "nickname" | "dislike" | "preference";
