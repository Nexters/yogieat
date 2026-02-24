"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FOOD_CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { colors } from "#/constants/color";
import type { FoodCategory } from "#/types/gathering";

// 카테고리 노출 순서 (고정)
const FOOD_CATEGORY_ORDER: FoodCategory[] = [
	"KOREAN",
	"JAPANESE",
	"CHINESE",
	"WESTERN",
	"ASIAN",
	"ANY",
];

const NON_ANY_CATEGORIES: FoodCategory[] = [
	"KOREAN",
	"JAPANESE",
	"CHINESE",
	"WESTERN",
	"ASIAN",
];

// 카테고리별 그래프 색상 (inline style용)
const FOOD_CATEGORY_COLOR: Record<FoodCategory, string> = {
	KOREAN: colors.palette.primary[500],
	JAPANESE: colors.palette.yellow[900],
	CHINESE: colors.palette.primary[900],
	WESTERN: colors.palette.secondary[500],
	ASIAN: colors.palette.green[500],
	ANY: colors.palette.gray[200],
};

export interface VoteSummarySectionProps {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	distances: Record<string, number>;
	peopleCount: number;
}

function computePreferenceSubtitle(
	preferences: Record<string, number>,
	peopleCount: number,
): string {
	const voted = NON_ANY_CATEGORIES.filter((c) => (preferences[c] ?? 0) >= 1);

	// 우선순위 1: 5개 전부 투표됨
	if (voted.length === NON_ANY_CATEGORIES.length) {
		return "각자 좋아하는게 달라";
	}

	// 우선순위 2: 만장일치 (특정 카테고리 count == peopleCount)
	const unanimous = NON_ANY_CATEGORIES.find(
		(c) => (preferences[c] ?? 0) === peopleCount,
	);
	if (unanimous) {
		return `"${FOOD_CATEGORY_LABEL[unanimous]}"으로 만장일치`;
	}

	// 우선순위 3: non-ANY 투표 없음
	if (voted.length === 0) {
		return "아무거나 상관없어";
	}

	// 우선순위 4 & 5: 카테고리 나열 (노출 순서 기준)
	const ordered = FOOD_CATEGORY_ORDER.filter(
		(c) => c !== "ANY" && (preferences[c] ?? 0) >= 1,
	);
	const labels = ordered.map((c) => FOOD_CATEGORY_LABEL[c]).join(", ");

	// 4개 이상(n-1)이면 "좋아" 없음, 1~3개면 "좋아" 붙임
	if (ordered.length >= 4) {
		return `"${labels}"`;
	}
	return `"${labels}" 좋아`;
}

function computeDislikeSubtitle(dislikes: Record<string, number>): string {
	const voted = NON_ANY_CATEGORIES.filter((c) => (dislikes[c] ?? 0) >= 1);

	// 우선순위 1: 5개 전부 투표됨
	if (voted.length === NON_ANY_CATEGORIES.length) {
		return "모두 달라서 한 명이 양보해줬...";
	}

	// 우선순위 2: 투표 없음
	if (voted.length === 0) {
		return "의견을 내주면 안될까...";
	}

	// 우선순위 3: 1개만 선택
	if (voted.length === 1) {
		return `"${FOOD_CATEGORY_LABEL[voted[0]]}"으로 만장일치`;
	}

	// 우선순위 4: 2~4개 나열 (노출 순서 기준)
	const ordered = FOOD_CATEGORY_ORDER.filter(
		(c) => c !== "ANY" && (dislikes[c] ?? 0) >= 1,
	);
	const labels = ordered.map((c) => FOOD_CATEGORY_LABEL[c]).join(", ");
	return `"${labels}" 싫어`;
}

function computeDistanceSubtitle(distances: Record<string, number>): string {
	const near = distances["RANGE_500M"] ?? 0;
	const far = distances["RANGE_1KM"] ?? 0;
	const any = distances["ANY"] ?? 0;

	// ANY만 있는 경우
	if (near === 0 && far === 0 && any > 0) {
		return "모임원 모두가 '어디든 상관없어'";
	}

	if (near > far) return "치열한 고민 끝에 '가까운 맛집'으로";
	if (far > near) return "치열한 고민 끝에 '멀어도 감수'";
	if (near === far && near > 0) return "치열한 고민 끝에 '반반'으로";

	// near == far == 0 (empty 포함) fallback
	return "모임원 모두가 '어디든 상관없어'";
}

// 여러 카테고리 이미지를 무한 자동 슬라이딩
function AutoSlideImage({ categories }: { categories: FoodCategory[] }) {
	const [idx, setIdx] = useState(0);

	useEffect(() => {
		if (categories.length <= 1) return;
		const timer = setInterval(() => {
			setIdx((prev) => (prev + 1) % categories.length);
		}, 2500);
		return () => clearInterval(timer);
	}, [categories.length]);

	return (
		<div className="ygi:relative ygi:size-16 ygi:shrink-0">
			{categories.map((cat, i) => (
				<div
					key={cat}
					className="ygi:absolute ygi:inset-0 ygi:transition-opacity ygi:duration-500"
					style={{ opacity: i === idx ? 1 : 0 }}
				>
					<Image
						src={`/images/foodCategory/${cat.toLowerCase()}.svg`}
						alt={FOOD_CATEGORY_LABEL[cat]}
						fill
						className="ygi:object-contain"
					/>
				</div>
			))}
		</div>
	);
}

function PreferenceVoteBlock({
	preferences,
	peopleCount,
}: {
	preferences: Record<string, number>;
	peopleCount: number;
}) {
	const subtitle = computePreferenceSubtitle(preferences, peopleCount);
	const voted = NON_ANY_CATEGORIES.filter((c) => (preferences[c] ?? 0) >= 1);

	// food image 결정
	const isAllAny = voted.length === 0;
	const isUnanimous = NON_ANY_CATEGORIES.some(
		(c) => (preferences[c] ?? 0) === peopleCount,
	);
	const imageCategories: FoodCategory[] = isAllAny
		? ["ANY"]
		: isUnanimous
			? ([NON_ANY_CATEGORIES.find(
					(c) => (preferences[c] ?? 0) === peopleCount,
				)] as FoodCategory[])
			: (FOOD_CATEGORY_ORDER.filter(
					(c) => c !== "ANY" && (preferences[c] ?? 0) >= 1,
				) as FoodCategory[]);

	// progress bar 세그먼트 (노출 순서 기준, votes 있는 것만)
	const barCategories = FOOD_CATEGORY_ORDER.filter(
		(c) => (preferences[c] ?? 0) >= 1,
	);
	const totalVotes = barCategories.reduce(
		(sum, c) => sum + (preferences[c] ?? 0),
		0,
	);

	// 카테고리 dot 목록 (ANY 포함, 순서 유지, count > 0만)
	const listCategories = FOOD_CATEGORY_ORDER.filter(
		(c) => (preferences[c] ?? 0) >= 1,
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:rounded-xl ygi:bg-surface-white ygi:p-5">
			{/* 헤더 */}
			<div className="ygi:flex ygi:items-start ygi:justify-between ygi:gap-3">
				<div className="ygi:flex ygi:flex-1 ygi:flex-col ygi:gap-2">
					{/* 타이틀 */}
					<div className="ygi:flex ygi:items-center ygi:gap-1.5">
						<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-secondary-500">
							<div className="ygi:h-2.5 ygi:w-2.5 ygi:rounded-full ygi:bg-white" />
						</div>
						<span className="ygi:body-14-sb ygi:text-text-secondary">
							우리가 먹고 싶은 건
						</span>
					</div>
					{/* subtitle */}
					<p className="ygi:heading-18-bd ygi:text-text-primary">{subtitle}</p>
				</div>
				{/* food image */}
				<AutoSlideImage categories={imageCategories} />
			</div>

			{/* progress bar */}
			{totalVotes > 0 && (
				<div className="ygi:flex ygi:h-4 ygi:w-full ygi:overflow-hidden ygi:rounded-sm ygi:bg-palette-gray-200">
					{barCategories.map((cat) => {
						const pct = ((preferences[cat] ?? 0) / totalVotes) * 100;
						return (
							<div
								key={cat}
								style={{
									width: `${pct}%`,
									backgroundColor: FOOD_CATEGORY_COLOR[cat],
								}}
								className="ygi:h-full ygi:shrink-0"
							/>
						);
					})}
				</div>
			)}

			{/* 카테고리 dot 목록 */}
			{listCategories.length > 0 && (
				<div className="ygi:flex ygi:flex-wrap ygi:gap-x-4 ygi:gap-y-2">
					{listCategories.map((cat) => (
						<div key={cat} className="ygi:flex ygi:items-center ygi:gap-1.5">
							<div
								className="ygi:size-2 ygi:shrink-0 ygi:rounded-full"
								style={{ backgroundColor: FOOD_CATEGORY_COLOR[cat] }}
							/>
							<span className="ygi:caption-12-md ygi:text-text-secondary">
								{FOOD_CATEGORY_LABEL[cat]} {preferences[cat]}표
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function DislikeVoteBlock({ dislikes }: { dislikes: Record<string, number> }) {
	const subtitle = computeDislikeSubtitle(dislikes);

	const votedCategories = FOOD_CATEGORY_ORDER.filter(
		(c) => c !== "ANY" && (dislikes[c] ?? 0) >= 1,
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:rounded-xl ygi:bg-surface-white ygi:p-5">
			{/* 헤더 */}
			<div className="ygi:flex ygi:flex-col ygi:gap-2">
				<div className="ygi:flex ygi:items-center ygi:gap-1.5">
					<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-primary-500">
						<svg
							width="11"
							height="11"
							viewBox="0 0 11 11"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1L10 10M10 1L1 10"
								stroke="white"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<span className="ygi:body-14-sb ygi:text-text-secondary">
						우리가 먹기 싫은 건
					</span>
				</div>
				<p className="ygi:heading-18-bd ygi:text-text-primary">{subtitle}</p>
			</div>

			{/* 카테고리 이미지 그리드 */}
			{votedCategories.length > 0 && (
				<div className="ygi:flex ygi:flex-wrap ygi:gap-3">
					{votedCategories.map((cat) => (
						<div
							key={cat}
							className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-1"
						>
							<div className="ygi:relative ygi:size-14 ygi:overflow-hidden ygi:rounded-lg ygi:bg-surface-gray">
								<Image
									src={`/images/foodCategory/${cat.toLowerCase()}.svg`}
									alt={FOOD_CATEGORY_LABEL[cat]}
									fill
									className="ygi:object-contain ygi:p-2"
								/>
							</div>
							<span className="ygi:caption-12-md ygi:text-text-secondary">
								{FOOD_CATEGORY_LABEL[cat]} {dislikes[cat]}표
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function DistanceVoteBlock({
	distances,
}: {
	distances: Record<string, number>;
}) {
	const subtitle = computeDistanceSubtitle(distances);
	const near = distances["RANGE_500M"] ?? 0;
	const far = distances["RANGE_1KM"] ?? 0;
	const total = near + far;
	const isAllAny = near === 0 && far === 0;

	const nearPct = total === 0 ? 0 : Math.round((near / total) * 100);
	const farPct = total === 0 ? 0 : 100 - nearPct;

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:rounded-xl ygi:bg-surface-white ygi:p-5">
			{/* 타이틀 + subtitle */}
			<div className="ygi:flex ygi:flex-col ygi:gap-1">
				<span className="ygi:body-14-md ygi:text-text-secondary">
					맛집의 거리는
				</span>
				<p className="ygi:body-16-sb ygi:text-text-primary">{subtitle}</p>
			</div>

			{/* VS 행 */}
			<div className="ygi:flex ygi:items-center ygi:justify-between">
				{/* 걷기 싫어 */}
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<div className="ygi:flex ygi:size-7 ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-gray">
						<div className="ygi:relative ygi:size-[26px]">
							<Image
								src="/images/result/distance-near.svg"
								alt="걷기 싫어"
								fill
								className="ygi:object-contain"
							/>
						</div>
					</div>
					<span className="ygi:caption-12-sb ygi:rounded-md ygi:bg-surface-primary ygi:px-2 ygi:py-1 ygi:text-text-interactive">
						걷기 싫어
					</span>
				</div>

				{/* VS */}
				<span className="ygi:caption-12-bd ygi:text-text-placeholder">VS</span>

				{/* 멀어도 감수 */}
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<span className="ygi:caption-12-sb ygi:rounded-md ygi:bg-surface-secondary ygi:px-2 ygi:py-1 ygi:text-palette-secondary-700">
						멀어도 감수
					</span>
					<div className="ygi:flex ygi:size-7 ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-gray">
						<div className="ygi:relative ygi:size-[26px]">
							<Image
								src="/images/result/distance-far.svg"
								alt="멀어도 감수"
								fill
								className="ygi:object-contain"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* 게이지 바 */}
			<div className="ygi:relative ygi:h-6 ygi:w-full ygi:overflow-hidden ygi:rounded-lg">
				{isAllAny ? (
					// 전원 상관없음: linear-gradient
					<div
						className="ygi:size-full"
						style={{
							background: `linear-gradient(to right, ${colors.palette.primary[500]}, ${colors.palette.secondary[300]})`,
						}}
					/>
				) : (
					// 배경: far 색상 (전체)
					<div
						className="ygi:absolute ygi:inset-0"
						style={{ backgroundColor: colors.palette.secondary[300] }}
					>
						{/* near 오버레이 (왼쪽부터) */}
						{nearPct > 0 && (
							<div
								className="ygi:absolute ygi:inset-y-0 ygi:left-0 ygi:flex ygi:items-center ygi:pl-2"
								style={{
									width: `${nearPct}%`,
									backgroundColor: colors.palette.primary[500],
								}}
							>
								{nearPct >= 15 && (
									<span className="ygi:caption-12-bd ygi:text-white">
										{nearPct}%
									</span>
								)}
							</div>
						)}
						{/* far 퍼센트 텍스트 (오른쪽) */}
						{farPct >= 15 && (
							<div className="ygi:absolute ygi:inset-y-0 ygi:right-0 ygi:flex ygi:items-center ygi:pr-2">
								<span className="ygi:caption-12-bd ygi:text-white">
									{farPct}%
								</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* 도보 시간 레이블 */}
			<div className="ygi:flex ygi:justify-between">
				<span className="ygi:caption-12-md ygi:text-text-secondary">
					도보 7분 내
				</span>
				<span className="ygi:caption-12-md ygi:text-text-secondary">
					도보 15분 내
				</span>
			</div>
		</div>
	);
}

export const VoteSummarySection = ({
	preferences,
	dislikes,
	distances,
	peopleCount,
}: VoteSummarySectionProps) => {
	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3">
			<h2 className="ygi:heading-22-bd ygi:text-text-primary">투표 결과</h2>
			<PreferenceVoteBlock
				preferences={preferences}
				peopleCount={peopleCount}
			/>
			<DislikeVoteBlock dislikes={dislikes} />
			<DistanceVoteBlock distances={distances} />
		</section>
	);
};
