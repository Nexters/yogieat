import { DistanceRange, Category } from "#/constants/gathering/opinion";

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
	largeCategory: Category;
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
