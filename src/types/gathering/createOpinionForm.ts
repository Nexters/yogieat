import { DistanceRange } from "./distance";
import { PreferredMenu } from "./preferredMenu";
import { FoodCategory } from "./foodCategory";

export interface OpinionForm {
	distanceRange: DistanceRange;
	dislikedFoods: FoodCategory[];
	preferredMenus: PreferredMenu;
}

export type OpinionStep = "distance" | "dislike" | "preference";
