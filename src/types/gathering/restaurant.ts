import { Category, DistanceRange } from "#/constants/gathering/opinion";
import type { GeoJsonGeometry } from "#/types/geo";

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
	location: GeoJsonGeometry;
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
