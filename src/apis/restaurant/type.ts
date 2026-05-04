import type { Category } from "#/constants/gathering/opinion";

/**
 * 식당이 위치한 권역 코드.
 *
 * 서버 OpenAPI 명세 기준 8개 값으로 한정된다. 새 권역이 추가되면 명세를 따라 갱신한다.
 */
export type RestaurantRegion =
	| "HONGDAE"
	| "GANGNAM"
	| "GONGDEOK"
	| "EULJIRO3GA"
	| "SADANG"
	| "JONGNO3GA"
	| "JAMSIL"
	| "SAMGAKJI";

/**
 * 식당 상세 응답 본문
 *
 * 프로젝트 공용 `apiClient.get<T>` 가 응답을 `ApiResponse<T> = { status, data, timestamp }`
 * 형태로 감싸므로, 본 타입은 envelope 의 `data` 본문만 표현한다.
 * recommend-result 도메인의 `Restaurant` 타입과는 별개의 도메인 객체.
 */
export interface RestaurantDetail {
	restaurantId: number;
	restaurantName: string;
	station: string | null;
	address: string;
	region: RestaurantRegion | null;
	largeCategory: Category;
	rating: number;
	imageUrl: string | null;
	mapUrl: string;
	description: string | null;
	/** "₩" 1~5 개의 문자열. 5 개 초과 응답이 올 가능성에 대비해 클램프 처리 */
	priceLevel: string | null;
	representMenu: string | null;
	representMenuPrice: number | null;
	representativeReview: string | null;
	reviewCount: number;
	aiMateSummaryTitle: string | null;
	aiMateSummaryContents: string[];
}

/**
 * 식당 상세 조회 응답 alias.
 *
 * `apiClient.get<GetRestaurantDetailResponse>` 호출 시 envelope 은 자동으로 적용되므로,
 * 본 alias 는 envelope 내부 본문 타입을 의미한다.
 */
export type GetRestaurantDetailResponse = RestaurantDetail;
