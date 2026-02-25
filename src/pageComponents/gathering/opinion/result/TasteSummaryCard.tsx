"use client";

import { CircleIcon } from "#/icons/circleIcon";
import { XIcon } from "#/icons/xIcon";
import { CATEGORY, CATEGORY_LABEL } from "#/constants/gathering/opinion";
import type { Category } from "#/types/gathering";
import Image from "next/image";

// "ANY"를 제외한 구체적 카테고리 목록
const foodCategories: Category[] = [
	CATEGORY.KOREAN,
	CATEGORY.JAPANESE,
	CATEGORY.CHINESE,
	CATEGORY.WESTERN,
	CATEGORY.ASIAN,
	CATEGORY.ANY,
];

const nonAnyFoodCategories: Category[] = [
	CATEGORY.KOREAN,
	CATEGORY.JAPANESE,
	CATEGORY.CHINESE,
	CATEGORY.WESTERN,
	CATEGORY.ASIAN,
];

/** 앞 단어 끝 음절의 받침 여부로 을/를 반환 */
function getEulReul(text: string): "을" | "를" {
	if (!text) return "을";
	const code = text.charCodeAt(text.length - 1);
	// 비한글 문자로 끝나는 경우 보수적으로 "을" 반환 (현재 레이블은 모두 한글로 끝남)
	if (code < 0xac00 || code > 0xd7a3) return "을";
	return (code - 0xac00) % 28 !== 0 ? "을" : "를";
}

function formatFoodList(keys: Category[]): string {
	return keys.map((k) => CATEGORY_LABEL[k]).join(", ");
}

interface TasteSummary {
	dislikeHighlight: string;
	dislikeSuffix: string;
	preferenceHighlight: string;
	preferenceSuffix: string;
	conclusion: string;
}

function computeTasteSummary(
	preferences: Record<string, number>,
	dislikes: Record<string, number>,
): TasteSummary {
	const votedPreferences = foodCategories.filter(
		(c) => (preferences[c] ?? 0) >= 1,
	);
	const votedPreferencesWithoutAny = votedPreferences.filter(
		(c) => c !== CATEGORY.ANY,
	);
	const votedDislikes = foodCategories.filter((c) => (dislikes[c] ?? 0) >= 1);
	const votedDislikesWithoutAny = votedDislikes.filter(
		(c) => c !== CATEGORY.ANY,
	);

	const isAllAnyPreferences = votedPreferencesWithoutAny.length === 0;
	const isAllAnyDislikes = votedDislikesWithoutAny.length === 0;

	// 라인 1: 선호 행
	let preferenceHighlight: string;
	let preferenceSuffix: string;

	if (isAllAnyPreferences) {
		preferenceHighlight = "아무 음식";
		preferenceSuffix = "이나 상관 없고";
	} else if (
		!isAllAnyPreferences &&
		votedPreferencesWithoutAny.length === 1
	) {
		const foodLabel = CATEGORY_LABEL[votedPreferencesWithoutAny[0]];
		preferenceHighlight = foodLabel;
		preferenceSuffix = `${getEulReul(foodLabel)} 먹고 싶어하고`;
	} else {
		preferenceHighlight = formatFoodList(votedPreferencesWithoutAny);
		preferenceSuffix = "중";
	}

	// 라인 2: 불호 행
	let dislikeHighlight: string;
	let dislikeSuffix: string;

	if (isAllAnyDislikes) {
		dislikeHighlight = "피하고 싶은 음식";
		dislikeSuffix = "없어서";
	} else if (votedDislikesWithoutAny.length === nonAnyFoodCategories.length) {
		dislikeHighlight = "피하고 싶은 음식";
		dislikeSuffix = "이 모두 달라서";
	} else {
		const lastLabel =
			CATEGORY_LABEL[
				votedDislikesWithoutAny[votedDislikesWithoutAny.length - 1]
			];
		dislikeHighlight = formatFoodList(votedDislikesWithoutAny);
		dislikeSuffix = `${getEulReul(lastLabel)} 빼고`;
	}

	// 라인 3: 결론
	const safePreferences = votedPreferencesWithoutAny.filter(
		(preference) =>
			!votedDislikesWithoutAny.some((dislike) => dislike === preference),
	);
	const hasIntersection = votedPreferencesWithoutAny.some((preference) =>
		votedDislikesWithoutAny.some((dislike) => dislike === preference),
	);

	let conclusion: string;
	if (
		votedDislikesWithoutAny.length === 0 &&
		votedPreferencesWithoutAny.length === 1
	) {
		conclusion = `평점 3.5 이상의 ${CATEGORY_LABEL[votedPreferencesWithoutAny[0]]} 맛집 추천`;
	} else if (hasIntersection && safePreferences.length > 0) {
		conclusion = `불호가 없는 ${formatFoodList(safePreferences)} 추천`;
	} else {
		conclusion = "평점 3.5 이상의 맛집 추천";
	}

	return {
		dislikeHighlight,
		dislikeSuffix,
		preferenceHighlight,
		preferenceSuffix,
		conclusion,
	};
}

export interface TasteSummaryCardProps {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
}

export const TasteSummaryCard = ({
	preferences,
	dislikes,
}: TasteSummaryCardProps) => {
	const {
		dislikeHighlight,
		dislikeSuffix,
		preferenceHighlight,
		preferenceSuffix,
		conclusion,
	} = computeTasteSummary(preferences, dislikes);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-5 ygi:rounded-md ygi:bg-surface-white ygi:p-5">
			{/* 캐릭터 일러스트 */}
			<div className="ygi:relative ygi:h-30.25 ygi:w-full ygi:overflow-hidden ygi:rounded-md ygi:bg-surface-gray">
				<div className="ygi:absolute ygi:bottom-0 ygi:left-1/2 ygi:h-26.5 ygi:w-52.75 ygi:-translate-x-1/2">
					<Image
						src="/images/result/taste-characters.png"
						alt="캐릭터 일러스트"
						priority
						fill
					/>
				</div>
			</div>

			{/* 텍스트 요약 */}
			<div className="ygi:flex ygi:w-full ygi:flex-col ygi:gap-2">
				{/* 선호 행 */}
				<div className="ygi:flex ygi:w-full ygi:items-center">
					<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-secondary-500">
						<CircleIcon size={11} className="ygi:text-white" />
					</div>
					<span className="ygi:ml-1.5 ygi:shrink-0 ygi:body-16-sb ygi:text-palette-secondary-700">
						{preferenceHighlight}
					</span>
					<span className="ygi:ml-1 ygi:body-16-sb ygi:text-text-primary">
						{preferenceSuffix}
					</span>
				</div>

				{/* 불호 행 */}
				<div className="ygi:flex ygi:w-full ygi:items-center">
					<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-primary-500">
						<XIcon size={11} className="ygi:text-white" />
					</div>
					<span className="ygi:ml-1.5 ygi:shrink-0 ygi:body-16-sb ygi:text-text-interactive">
						{dislikeHighlight}
					</span>
					<span className="ygi:ml-1 ygi:body-16-sb ygi:text-text-primary">
						{dislikeSuffix}
					</span>
				</div>

				{/* 결론 */}
				<span className="ygi:body-16-sb ygi:text-text-primary">
					{conclusion}
				</span>
			</div>
		</div>
	);
};
