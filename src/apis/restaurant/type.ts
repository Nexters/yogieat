import type { Category } from "#/constants/gathering/opinion";

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
	/** 지역 코드 (예: "GANGNAM"). 서버에서 동적으로 추가될 수 있어 string 으로 둔다. */
	region: string | null;
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
	/** 전화번호. 서버에서 "010-1234-5678" 형태의 dash-separated 문자열로 응답. */
	phoneNumber: string | null;
	reviewCount: number;
	aiMateSummaryTitle: string | null;
	aiMateSummaryContents: string[];
	/** 요기잇 메이커 픽 제목. null/빈값/"-" 일 수 있으며, 그 경우 UI 기본 라벨로 폴백한다. */
	teamRecommendationTitle: string | null;
	/** 요기잇 메이커 픽 본문(추천 사유). 이 값의 유무로 섹션 렌더링을 결정한다. */
	teamRecommendationReason: string | null;
}

/**
 * 식당 상세 조회 응답 alias.
 *
 * `apiClient.get<GetRestaurantDetailResponse>` 호출 시 envelope 은 자동으로 적용되므로,
 * 본 alias 는 envelope 내부 본문 타입을 의미한다.
 */
export type GetRestaurantDetailResponse = RestaurantDetail;
