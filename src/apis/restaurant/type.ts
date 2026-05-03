import type { Category } from "#/constants/gathering/opinion";

/**
 * 식당 상세 응답 본문
 *
 * 서버 응답에서 envelope `{ status, data }` 의 `data` 부분.
 * recommend-result 도메인의 `Restaurant` 타입과는 별개의 도메인 객체.
 */
export interface RestaurantDetail {
	restaurantId: number;
	restaurantName: string;
	station: string | null;
	address: string;
	region: string | null;
	largeCategory: Category;
	rating: number;
	imageUrl: string | null;
	mapUrl: string;
	description: string | null;
	priceLevel: number | null;
	representMenu: string | null;
	representMenuPrice: number | null;
	representativeReview: string | null;
	reviewCount: number;
	aiMateSummaryTitle: string | null;
	aiMateSummaryContents: string[];
}

/** 식당 상세 조회 응답 (envelope 포함) */
export interface GetRestaurantDetailResponse {
	status: number;
	data: RestaurantDetail;
}
