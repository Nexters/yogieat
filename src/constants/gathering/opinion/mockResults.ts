import type { RecommendationResult } from "#/types/gathering";

export const MOCK_RECOMMENDATION_RESULT: RecommendationResult = {
	topRecommendation: {
		id: "rest-001",
		name: "사브라운주 연남",
		category: "korean",
		rating: 4.5,
		distance: 450,
		imageUrl: "/images/placeholder-restaurant.jpg",
		address: "서울시 마포구",
	},
	otherCandidates: [
		{
			id: "rest-002",
			name: "미분또",
			category: "japanese",
			rating: 4.3,
			distance: 500,
		},
		{
			id: "rest-003",
			name: "회비어육곱",
			category: "korean",
			rating: 4.3,
			distance: 500,
		},
	],
	voteStats: {
		totalVotes: 5,
		submissionRate: 100,
		preferredFoods: [
			{ category: "korean", count: 3 },
			{ category: "none", count: 2 },
		],
		dislikedFoods: [
			{ category: "chinese", count: 3 },
			{ category: "asian", count: 2 },
		],
	},
};
