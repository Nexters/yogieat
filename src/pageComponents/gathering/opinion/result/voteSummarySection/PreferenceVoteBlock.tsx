"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { colors } from "#/constants/color";
import { CATEGORY, CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { CircleIcon } from "#/icons/circleIcon";
import type { Category } from "#/types/gathering";

import { foodCategoryOrder, nonAnyCategories } from "./VoteSummarySection";

// 카테고리별 그래프 색상 (inline style용)
const foodCategoryColorMap: Record<Category, string> = {
	KOREAN: colors.palette.primary[500],
	JAPANESE: colors.palette.yellow[900],
	CHINESE: colors.palette.primary[900],
	WESTERN: colors.palette.secondary[500],
	ASIAN: colors.palette.green[500],
	ANY: colors.palette.gray[200],
};

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

// 여러 카테고리 이미지를 단방향 무한 캐러셀
const AutoSlideImage = ({ categories }: { categories: Category[] }) => {
	const [idx, setIdx] = useState(0);
	const [fading, setFading] = useState(false);

	useEffect(() => {
		if (categories.length <= 1) return;
		let fadeTimeout: ReturnType<typeof setTimeout>;
		const timer = setInterval(() => {
			setFading(true);
			fadeTimeout = setTimeout(() => {
				setIdx((prev) => (prev + 1) % categories.length);
				setFading(false);
			}, 800);
		}, 2000);
		return () => {
			clearInterval(timer);
			clearTimeout(fadeTimeout);
		};
	}, [categories.length]);

	const nextIdx = (idx + 1) % categories.length;

	return (
		<div className="ygi:relative ygi:size-20 ygi:shrink-0">
			{/* 현재 이미지 */}
			<div
				className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center"
				style={{
					opacity: fading ? 0 : 1,
					transition: fading ? "opacity 800ms ease-in-out" : "none",
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
						opacity: fading ? 1 : 0,
						transition: fading
							? "opacity 800ms ease-in-out"
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

export const PreferenceVoteBlock = ({
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
