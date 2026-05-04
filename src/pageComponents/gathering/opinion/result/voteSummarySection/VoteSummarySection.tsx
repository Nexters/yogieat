"use client";

import { CATEGORY } from "#/constants/gathering/opinion";
import type { Category } from "#/types/gathering";

import { DislikeVoteBlock } from "./DislikeVoteBlock";
import { DistanceVoteBlock } from "./DistanceVoteBlock";
import { PreferenceVoteBlock } from "./PreferenceVoteBlock";

// 카테고리 노출 순서 (고정)
export const foodCategoryOrder: Category[] = [
	CATEGORY.KOREAN,
	CATEGORY.JAPANESE,
	CATEGORY.CHINESE,
	CATEGORY.WESTERN,
	CATEGORY.ASIAN,
	CATEGORY.ANY,
];

export const nonAnyCategories: Category[] = [
	CATEGORY.KOREAN,
	CATEGORY.JAPANESE,
	CATEGORY.CHINESE,
	CATEGORY.WESTERN,
	CATEGORY.ASIAN,
];

interface VoteSummarySectionProps {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	distances: Record<string, number>;
}

// 의견 수합 퍼널에서 거리 스텝이 제거됨(#132)에 따라 결과 페이지에서도 거리 투표 블록을 숨김 처리.
// 거리 값이 항상 null로 제출되어 의미 있는 결과를 보여줄 수 없음. 거리 스텝이 부활하면 true로 변경.
const SHOW_DISTANCE_VOTE_BLOCK = false;

export const VoteSummarySection = ({
	preferences,
	dislikes,
	distances,
}: VoteSummarySectionProps) => {
	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3">
			<h2 className="ygi:heading-22-bd ygi:text-text-primary">
				투표 결과
			</h2>
			<PreferenceVoteBlock preferences={preferences} />
			<DislikeVoteBlock dislikes={dislikes} />
			{SHOW_DISTANCE_VOTE_BLOCK && (
				<DistanceVoteBlock distances={distances} />
			)}
		</section>
	);
};
