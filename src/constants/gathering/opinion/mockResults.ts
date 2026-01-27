import type { RecommendationResult } from "#/types/gathering";

export const MOCK_RECOMMENDATION_RESULT: RecommendationResult = {
	topRecommendation: {
		rank: 1,
		restaurantId: 583,
		restaurantName: "또보겠지 떡볶이집 붕붕허니비점",
		address: "서울 마포구 와우산로29길 10",
		rating: 4.7,
		imageUrl: null,
		mapUrl: "http://place.map.kakao.com/763211643",
		representativeReview:
			"즉떡하면 역시 또보겠지! 버터갈릭감자튀김은 꼭 시켜야 해요. 떡볶이도 맛있고 마지막 볶음밥까지 완벽한 코스입니다. 줄 서서 먹는 이유가 있어요.",
		description:
			"즉석 떡볶이로 유명한 홍대 맛집으로, 다양한 토핑과 중독성 강한 양념이 특징입니다. 튀김, 볶음밥 등 사이드 메뉴도 인기가 많으며, 아기자기하고 개성 있는 인테리어가 젊은층에게 특히 사랑받고 있습니다.",
		region: null,
		location: {
			type: "Point",
			coordinates: [126.9244238199309, 37.55895606688181],
		},
		largeCategory: "KOREAN",
		mediumCategory: "즉석 떡볶이, 분식",
		majorityDistanceRange: "RANGE_500M",
	},
	otherCandidates: [
		{
			rank: 2,
			restaurantId: 584,
			restaurantName: "미분또 홍대점",
			address: "서울 마포구 와우산로21길 19-18",
			rating: 4.5,
			imageUrl: null,
			mapUrl: "http://place.map.kakao.com/1234567890",
			representativeReview:
				"일본 라멘 맛집! 국물이 진하고 면발이 쫄깃해요. 차슈도 부드럽고 양도 푸짐합니다.",
			description:
				"정통 일본식 라멘을 선보이는 홍대 라멘 전문점입니다. 진한 돈코츠 국물과 쫄깃한 면발이 특징이며, 차슈와 반숙란 등 토핑도 훌륭합니다.",
			region: null,
			location: {
				type: "Point",
				coordinates: [126.9254238199309, 37.55795606688181],
			},
			largeCategory: "JAPANESE",
			mediumCategory: "라멘",
			majorityDistanceRange: "RANGE_500M",
		},
		{
			rank: 3,
			restaurantId: 585,
			restaurantName: "회비어육곱 홍대점",
			address: "서울 마포구 양화로 160",
			rating: 4.4,
			imageUrl: null,
			mapUrl: "http://place.map.kakao.com/0987654321",
			representativeReview:
				"육회와 비빔밥이 환상의 조합! 신선한 육회와 고소한 참기름이 일품입니다. 가성비도 좋아요.",
			description:
				"신선한 육회와 비빔밥을 전문으로 하는 한식당입니다. 질 좋은 한우 육회와 다양한 나물이 어우러진 비빔밥이 인기 메뉴입니다.",
			region: null,
			location: {
				type: "Point",
				coordinates: [126.9234238199309, 37.55695606688181],
			},
			largeCategory: "KOREAN",
			mediumCategory: "육회, 비빔밥",
			majorityDistanceRange: "RANGE_1KM",
		},
	],
	preferences: {
		WESTERN: 1,
		JAPANESE: 1,
		ASIAN: 1,
		KOREAN: 3,
	},
	dislikes: {
		JAPANESE: 1,
		CHINESE: 1,
		ASIAN: 1,
		KOREAN: 1,
	},
	agreementRate: 50.0,
};
