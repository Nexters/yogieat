import type { RestaurantDetail } from "#/apis/restaurant";

export const MOCK_RESTAURANT_DETAIL: RestaurantDetail = {
	restaurantId: 1,
	restaurantName: "홍대 맛집",
	station: "홍대입구역",
	address: "서울 마포구 와우산로 00",
	region: "HONGDAE",
	largeCategory: "KOREAN",
	rating: 4.5,
	imageUrl: "https://example.com/image.jpg",
	mapUrl: "https://map.kakao.com/...",
	description: "분위기 좋은 한식 맛집",
	priceLevel: "₩₩",
	representMenu: "김치찌개",
	representMenuPrice: 9000,
	representativeReview: "진짜 맛있어요",
	reviewCount: 120,
	aiMateSummaryTitle: "가성비 좋은 한식 맛집",
	aiMateSummaryContents: ["유아 동반", "단체석"],
};
