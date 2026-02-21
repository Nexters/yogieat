import { DistanceRange } from "#/constants/gathering/opinion";
import { FoodCategory } from "./foodCategory";

export interface Restaurant {
	rank: number;
	restaurantId: number;
	restaurantName: string;
	address: string;
	rating: number;
	imageUrl: string | null;
	mapUrl: string;
	representativeReview: string;
	description: string;
	region: string | null;
	location: {
		type: string;
		coordinates: [number, number];
	};
	largeCategory: FoodCategory;
	mediumCategory: string;
	majorityDistanceRange: DistanceRange;
	reviewCount: number;
	blogReviewCount: number;
	representMenu: string | null;
	representMenuPrice: number | null;
	priceLevel: string | null;
	aiMateSummaryTitle: string | null;
	aiMateSummaryContents: string[];
	reasonText: string | null;
}
