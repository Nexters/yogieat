"use client";

import Image from "next/image";

import { CATEGORY, CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { XIcon } from "#/icons/xIcon";

import { foodCategoryOrder, nonAnyCategories } from "./VoteSummarySection";

const computeDislikeSubtitle = (dislikes: Record<string, number>): string => {
	const voted = foodCategoryOrder.filter((c) => (dislikes[c] ?? 0) >= 1);

	// 우선순위 1: 5개 전부 투표됨
	if (
		voted.filter((c) => c !== CATEGORY.ANY).length ===
		nonAnyCategories.length
	) {
		return "모두 달라서 한 명이 양보해줘...";
	}

	// 우선순위 2: 투표 없음
	if (voted.every((c) => c === CATEGORY.ANY)) {
		return "의견을 내주면 안될까...";
	}

	// 우선순위 3: 1개만 선택
	if (voted.every((c) => c !== CATEGORY.ANY) && voted.length === 1) {
		return `"${CATEGORY_LABEL[voted[0]]}"으로 만장일치`;
	}

	// 우선순위 4: 2~4개 나열 (노출 순서 기준)
	const ordered = foodCategoryOrder.filter(
		(c) => c !== CATEGORY.ANY && (dislikes[c] ?? 0) >= 1,
	);
	const labels = ordered.map((c) => CATEGORY_LABEL[c]).join(", ");
	return `"${labels}" 싫어`;
};

export const DislikeVoteBlock = ({
	dislikes,
}: {
	dislikes: Record<string, number>;
}) => {
	const subtitle = computeDislikeSubtitle(dislikes);

	const votedCategories = foodCategoryOrder.filter(
		(c) => (dislikes[c] ?? 0) >= 1,
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:rounded-md ygi:bg-surface-white ygi:p-5">
			{/* 헤더 */}
			<div className="ygi:flex ygi:flex-col">
				<div className="ygi:mb-2 ygi:flex ygi:items-center ygi:gap-2">
					<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-primary-500">
						<XIcon size={11} className="ygi:text-white" />
					</div>
					<span className="ygi:body-14-sb ygi:text-text-secondary">
						우리가 먹기 싫은 건
					</span>
				</div>
				<p className="ygi:mb-5 ygi:body-16-sb ygi:text-text-primary">
					{subtitle}
				</p>
			</div>

			{/* 카테고리 이미지 그리드 */}
			{votedCategories.length > 0 && (
				// 한 개면 full, 2개 부터는 2 col, 3개 부터는 3 col
				<div
					className={`ygi:grid ygi:gap-1.5 ${votedCategories.length === 1 ? "ygi:grid-cols-1" : votedCategories.length === 2 ? "ygi:grid-cols-2" : "ygi:grid-cols-3"}`}
				>
					{votedCategories.map((cat) => (
						<div
							key={cat}
							className={`ygi:flex ygi:flex-col ygi:items-center ygi:gap-2 ygi:rounded-lg ygi:bg-surface-lightgray ygi:p-3 ${votedCategories.length >= 3 && "ygi:aspect-square ygi:justify-center"}`}
						>
							<div className="ygi:relative ygi:size-10 ygi:overflow-hidden">
								<Image
									src={`/images/foodCategory/${cat.toLowerCase()}.svg`}
									alt={CATEGORY_LABEL[cat]}
									fill
								/>
							</div>
							<p className="ygi:flex ygi:items-center ygi:gap-1">
								<span className="ygi:caption-12-bd ygi:text-text-primary">
									{CATEGORY_LABEL[cat]}
								</span>
								<span className="ygi:caption-12-md ygi:text-text-primary">
									{dislikes[cat]}표
								</span>
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
