import type { Restaurant } from "#/types/gathering";

export const MOCK_RESTAURANT_DETAIL: Restaurant = {
	rank: 1,
	restaurantId: 444,
	restaurantName: "마루심 강남점",
	address: "서울 서초구 서초대로 326",
	rating: 4.8,
	imageUrl: "http://t1.kakaocdn.net/mystore/67FE73AC7092490CBFA21729535EE6F5",
	mapUrl: "https://place.map.kakao.com/2074481849",
	representativeReview:
		"Lots of variety in food selection.\nSurroundings very calm and peaceful\nFood tastes really yummy! ",
	description:
		"나고야식 장어덮밥인 히츠마부시 전문점으로, 바삭하게 구운 장어와 특제 소스의 조화가 일품입니다. 다양한 방법으로 즐기는 히츠마부시의 매력에 빠져보세요.",
	region: "GANGNAM",
	location: {
		type: "Point",
		coordinates: [127.03190344594316, 37.496714916323626],
	},
	largeCategory: "JAPANESE",
	mediumCategory: "히츠마부시",
	majorityDistanceRange: "RANGE_500M",
	reviewCount: 170,
	blogReviewCount: 97,
	representMenu: "히츠마부시 (상)",
	representMenuPrice: 38000,
	priceLevel: "₩₩₩₩",
	aiMateSummaryTitle: "정통 나고야식 히츠마부시",
	aiMateSummaryContents: [
		"히츠마부시 (상) 추천",
		"전지적 참견 시점 언급",
		"프라이빗룸",
		"콜키지 부과",
	],
	reasonText: "프라이빗 룸에서 즐기는 정갈한 일식 한상\n을(를) 추천해요",
};
