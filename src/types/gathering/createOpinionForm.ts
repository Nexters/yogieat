import { DistanceRange } from "./distance";
import { PreferredMenu } from "./preferredMenu";
import { FoodCategory } from "./foodCategory";

export interface OpinionForm {
	nickname: string;
	distanceRange: DistanceRange;
	dislikedFoods: FoodCategory[];
	preferredMenus: PreferredMenu;
}

export type OpinionStep = "nickname" | "distance" | "dislike" | "preference";
