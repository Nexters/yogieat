"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { CATEGORY, CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { colors } from "#/constants/color";
import type { Category } from "#/types/gathering";
import { XIcon } from "#/icons/xIcon";
import { CircleIcon } from "#/icons/circleIcon";

// 카테고리 노출 순서 (고정)
const foodCategoryOrder: Category[] = [
	CATEGORY.KOREAN,
	CATEGORY.JAPANESE,
	CATEGORY.CHINESE,
	CATEGORY.WESTERN,
	CATEGORY.ASIAN,
	CATEGORY.ANY,
];

const nonAnyCategories: Category[] = [
	CATEGORY.KOREAN,
	CATEGORY.JAPANESE,
	CATEGORY.CHINESE,
	CATEGORY.WESTERN,
	CATEGORY.ASIAN,
];

// 카테고리별 그래프 색상 (inline style용)
const foodCategoryColorMap: Record<Category, string> = {
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
}

const computePreferenceSubtitle = (
	preferences: Record<string, number>,
): string => {
	const voted = foodCategoryOrder.filter((c) => (preferences[c] ?? 0) >= 1);

	// 우선순위 1: 5개 전부 투표됨
	if (
		voted.filter((c) => c !== CATEGORY.ANY).length ===
		nonAnyCategories.length
	) {
		return "각자 좋아하는게 달라";
	}

	// 우선순위 2: 만장일치 (특정 카테고리 count == peopleCount)
	if (voted.every((c) => c !== CATEGORY.ANY) && voted.length === 1) {
		return `"${CATEGORY_LABEL[voted[0]]}"으로 만장일치`;
	}

	// 우선순위 3: non-ANY 투표 없음
	if (voted.every((c) => c === CATEGORY.ANY)) {
		return "아무거나 상관없어";
	}

	// 우선순위 4 & 5: 카테고리 나열 (노출 순서 기준)
	const ordered = foodCategoryOrder.filter(
		(c) => c !== CATEGORY.ANY && (preferences[c] ?? 0) >= 1,
	);
	const labels = ordered.map((c) => CATEGORY_LABEL[c]).join(", ");

	// 4개 이상(n-1)이면 "좋아" 없음, 1~3개면 "좋아" 붙임
	if (ordered.length >= 4) {
		return `"${labels}"`;
	}
	return `"${labels}" 좋아`;
};

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

const computeDistanceSubtitle = (distances: Record<string, number>): string => {
	const near = distances["RANGE_500M"] ?? 0;
	const far = distances["RANGE_1KM"] ?? 0;
	const any = distances["ANY"] ?? 0;

	// ANY만 있는 경우
	if (near === 0 && far === 0 && any > 0) {
		return `모임원 모두가 "어디든 상관없어"`;
	}

	if (near > far) return `치열한 고민 끝에 "가까운 맛집"으로`;
	if (far > near) return `치열한 고민 끝에 "멀어도 감수"`;
	if (near === far && near > 0) return `치열한 고민 끝에 "반반"으로`;

	// near == far == 0 (empty 포함) fallback
	return `모임원 모두가 "어디든 상관없어"`;
};

// 여러 카테고리 이미지를 단방향 무한 캐러셀
const AutoSlideImage = ({ categories }: { categories: Category[] }) => {
	const [idx, setIdx] = useState(0);
	const [sliding, setSliding] = useState(false);

	useEffect(() => {
		if (categories.length <= 1) return;
		let slideTimeout: ReturnType<typeof setTimeout>;
		const timer = setInterval(() => {
			setSliding(true);
			slideTimeout = setTimeout(() => {
				setIdx((prev) => (prev + 1) % categories.length);
				setSliding(false);
			}, 500);
		}, 1500);
		return () => {
			clearInterval(timer);
			clearTimeout(slideTimeout);
		};
	}, [categories.length]);

	const nextIdx = (idx + 1) % categories.length;

	return (
		<div className="ygi:relative ygi:size-20 ygi:shrink-0 ygi:overflow-hidden">
			{/* 현재 이미지 */}
			<div
				className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center"
				style={{
					transform: sliding ? "translateX(-100%)" : "translateX(0)",
					transition: sliding
						? "transform 500ms ease-in-out"
						: "none",
				}}
			>
				<div className="ygi:relative ygi:size-15">
					<Image
						src={`/images/foodCategory/${categories[idx].toLowerCase()}.svg`}
						alt={CATEGORY_LABEL[categories[idx]]}
						fill
						className="ygi:object-contain"
					/>
				</div>
			</div>
			{/* 다음 이미지 */}
			{categories.length > 1 && (
				<div
					className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center"
					style={{
						transform: sliding
							? "translateX(0)"
							: "translateX(100%)",
						transition: sliding
							? "transform 500ms ease-in-out"
							: "none",
					}}
				>
					<div className="ygi:relative ygi:size-15">
						<Image
							src={`/images/foodCategory/${categories[nextIdx].toLowerCase()}.svg`}
							alt={CATEGORY_LABEL[categories[nextIdx]]}
							fill
							className="ygi:object-contain"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

const PreferenceVoteBlock = ({
	preferences,
}: {
	preferences: Record<string, number>;
}) => {
	const subtitle = computePreferenceSubtitle(preferences);
	const voted = foodCategoryOrder.filter((c) => (preferences[c] ?? 0) >= 1);

	// food image 결정
	const isAllAny = voted.every((c) => c === CATEGORY.ANY);
	const unanimousCategory =
		voted.every((c) => c !== CATEGORY.ANY) && voted.length === 1
			? voted[0]
			: null;
	const imageCategories: Category[] = isAllAny
		? [CATEGORY.ANY]
		: unanimousCategory
			? [unanimousCategory]
			: voted.filter((c) => c !== CATEGORY.ANY);

	// progress bar 세그먼트 (투표 수 내림차순, ANY 마지막, 동률은 고정 순서 유지)
	const barCategories = foodCategoryOrder
		.filter((c) => (preferences[c] ?? 0) >= 1)
		.sort((a, b) => {
			if (a === CATEGORY.ANY) return 1;
			if (b === CATEGORY.ANY) return -1;
			return (preferences[b] ?? 0) - (preferences[a] ?? 0);
		});
	const totalVotes = barCategories.reduce(
		(sum, c) => sum + (preferences[c] ?? 0),
		0,
	);

	// 카테고리 dot 목록 (투표 수 내림차순, ANY 마지막, 동률은 고정 순서 유지)
	const listCategories = foodCategoryOrder
		.filter((c) => (preferences[c] ?? 0) >= 1)
		.sort((a, b) => {
			if (a === CATEGORY.ANY) return 1;
			if (b === CATEGORY.ANY) return -1;
			return (preferences[b] ?? 0) - (preferences[a] ?? 0);
		});

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:rounded-md ygi:bg-surface-white ygi:p-5">
			{/* 헤더 */}
			<div className="ygi:flex ygi:items-center ygi:justify-between ygi:gap-2">
				<div className="ygi:flex ygi:flex-1 ygi:flex-col">
					{/* 타이틀 */}
					<div className="ygi:mb-2 ygi:flex ygi:items-center ygi:gap-2">
						<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-secondary-500">
							<CircleIcon size={11} className="ygi:text-white" />
						</div>
						<span className="ygi:body-14-md ygi:text-text-secondary">
							우리가 먹고 싶은 건
						</span>
					</div>
					{/* subtitle */}
					<p className="ygi:mb-4 ygi:body-16-bd ygi:text-text-primary">
						{subtitle}
					</p>

					{/* progress bar */}
					{totalVotes > 0 && (
						<div className="ygi:flex ygi:h-4 ygi:w-full ygi:overflow-hidden ygi:rounded-xs ygi:bg-palette-gray-200">
							{barCategories.map((cat) => {
								const pct =
									((preferences[cat] ?? 0) / totalVotes) *
									100;
								return (
									<div
										key={cat}
										style={{
											width: `${pct}%`,
											backgroundColor:
												foodCategoryColorMap[cat],
										}}
										className="ygi:h-full ygi:shrink-0"
									/>
								);
							})}
						</div>
					)}
				</div>
				{/* food image */}
				<AutoSlideImage categories={imageCategories} />
			</div>

			{/* 카테고리 dot 목록 */}
			{listCategories.length > 0 && (
				<div className="ygi:rounded-md ygi:bg-surface-lightgray ygi:p-[12px_16px]">
					<div className="ygi:grid ygi:grid-cols-2 ygi:gap-x-3 ygi:gap-y-2">
						{listCategories.map((cat) => (
							<div
								key={cat}
								className="ygi:flex ygi:items-center ygi:gap-2 ygi:caption-12-md ygi:text-text-primary"
							>
								<div
									className="ygi:size-2 ygi:shrink-0 ygi:rounded-full"
									style={{
										backgroundColor:
											foodCategoryColorMap[cat],
									}}
								/>
								<span>{CATEGORY_LABEL[cat]}</span>
								<span>{preferences[cat]}표</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const DislikeVoteBlock = ({
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

const DistanceVoteBlock = ({
	distances,
}: {
	distances: Record<string, number>;
}) => {
	const subtitle = computeDistanceSubtitle(distances);
	const near = distances["RANGE_500M"] ?? 0;
	const far = distances["RANGE_1KM"] ?? 0;
	const total = near + far;
	const isAllAny = near === 0 && far === 0;

	const nearPct = total === 0 ? 0 : Math.round((near / total) * 100);
	const farPct = total === 0 ? 0 : 100 - nearPct;

	return (
		<div className="ygi:flex ygi:flex-col ygi:rounded-md ygi:bg-surface-white ygi:p-5">
			{/* 타이틀 + subtitle */}
			<div className="ygi:mb-5 ygi:flex ygi:flex-col ygi:gap-1">
				<span className="ygi:body-14-md ygi:text-text-secondary">
					맛집의 거리는
				</span>
				<p className="ygi:body-16-sb ygi:text-text-primary">
					{subtitle}
				</p>
			</div>

			{/* VS 행 */}
			<div className="ygi:mb-2 ygi:flex ygi:items-center ygi:justify-between">
				{/* 걷기 싫어 */}
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<div className="ygi:flex ygi:size-7 ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-gray">
						<Image
							src="/images/result/distance-near.svg"
							alt="걷기 싫어"
							width={26}
							height={26}
						/>
					</div>
					<div className="ygi:flex ygi:items-center">
						<div
							style={{
								width: 0,
								height: 0,
								borderTop: "5px solid transparent",
								borderBottom: "5px solid transparent",
								borderRight: `6px solid ${colors.surface.primary}`,
							}}
						/>
						<span className="ygi:rounded-xs ygi:bg-surface-primary ygi:px-2 ygi:py-1 ygi:caption-12-sb ygi:text-text-interactive">
							걷기 싫어
						</span>
					</div>
				</div>

				{/* VS */}
				<span className="ygi:caption-12-bd ygi:text-text-placeholder">
					VS
				</span>

				{/* 멀어도 감수 */}
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<div className="ygi:flex ygi:items-center">
						<span className="ygi:rounded-xs ygi:bg-surface-secondary ygi:px-2 ygi:py-1 ygi:caption-12-sb ygi:text-palette-secondary-700">
							멀어도 감수
						</span>
						<div
							style={{
								width: 0,
								height: 0,
								borderTop: "5px solid transparent",
								borderBottom: "5px solid transparent",
								borderLeft: `6px solid ${colors.surface.secondary}`,
							}}
						/>
					</div>
					<div className="ygi:flex ygi:size-7 ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-gray">
						<Image
							src="/images/result/distance-far.svg"
							alt="멀어도 감수"
							width={26}
							height={26}
						/>
					</div>
				</div>
			</div>

			{/* 게이지 바 */}
			<div className="ygi:relative ygi:mb-2 ygi:h-6 ygi:w-full ygi:overflow-hidden ygi:rounded-sm">
				{isAllAny ? (
					// 전원 상관없음: linear-gradient
					<div
						className="ygi:flex ygi:size-full ygi:items-center ygi:justify-center"
						style={{
							background: `linear-gradient(to right, ${colors.palette.primary[500]}, ${colors.palette.secondary[300]})`,
						}}
					>
						<span className="ygi:caption-12-bd ygi:text-text-inverse">
							100%
						</span>
					</div>
				) : (
					// 배경: far 색상 (전체)
					<div
						className="ygi:absolute ygi:inset-0"
						style={{
							backgroundColor: colors.palette.secondary[300],
						}}
					>
						{/* near 오버레이 (왼쪽부터) */}
						{nearPct > 0 && (
							<div
								className="ygi:absolute ygi:inset-y-0 ygi:left-0 ygi:flex ygi:items-center ygi:pl-2"
								style={{
									width: `${nearPct}%`,
									backgroundColor:
										colors.palette.primary[500],
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
};

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
			<DistanceVoteBlock distances={distances} />
		</section>
	);
};
