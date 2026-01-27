"use client";

import type { FoodCategory } from "#/types/gathering";
import { ProgressBar } from "#/components/progressBar";
import { CircleIcon } from "#/icons/circleIcon";
import { XIcon } from "#/icons/xIcon";
import { FOOD_CATEGORY_LABELS } from "#/constants/gathering/opinion";
import { twJoin } from "tailwind-merge";
import type { ReactNode } from "react";

export interface VoteSummarySectionProps {
	preferences: Record<string, number>;
	dislikes: Record<string, number>;
	agreementRate: number;
}

interface VoteCategoryProps {
	icon: ReactNode;
	title: string;
	votes: Record<string, number>;
}

const VoteCategory = ({ icon, title, votes }: VoteCategoryProps) => {
	const sortedVotes = Object.entries(votes)
		.map(([category, count]) => ({
			category: category as FoodCategory,
			count,
		}))
		.sort((a, b) => b.count - a.count);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-4">
			{/* Title with Icon */}
			<div className="ygi:flex ygi:items-center ygi:gap-2">
				{icon}
				<h3 className="ygi:body-14-sb ygi:text-text-primary">
					{title}
				</h3>
			</div>

			{/* Vote Items */}
			<div className="ygi:flex ygi:flex-wrap ygi:items-center ygi:gap-4">
				{sortedVotes.map((vote) => (
					<div
						key={vote.category}
						className="ygi:flex ygi:items-center ygi:gap-1"
					>
						<span className="ygi:body-14-md ygi:text-text-secondary">
							{FOOD_CATEGORY_LABELS[vote.category]}
						</span>
						<span
							className={twJoin(
								"ygi:rounded ygi:px-1 ygi:py-0.5",
								"ygi:bg-surface-primary ygi:caption-12-sb ygi:text-text-interactive",
							)}
						>
							{vote.count}표
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export const VoteSummarySection = ({
	preferences,
	dislikes,
	agreementRate,
}: VoteSummarySectionProps) => {
	return (
		<section
			className={twJoin(
				"ygi:rounded-xl ygi:bg-surface-white",
				"ygi:flex ygi:flex-col ygi:gap-8 ygi:p-5",
			)}
		>
			{/* 의견 집계율 */}
			<div className="ygi:flex ygi:flex-col ygi:gap-5">
				<div className="ygi:flex ygi:items-start ygi:justify-between">
					<h5 className="ygi:heading-18-bd ygi:flex-1 ygi:text-text-primary">
						의견 일치율
					</h5>
					<span className="ygi:shrink-0 ygi:body-18-bd ygi:text-text-interactive">
						{agreementRate}%
					</span>
				</div>
				<ProgressBar value={agreementRate} />
			</div>

			{/* Divider */}
			<div className="ygi:h-px ygi:bg-border-default" />

			{/* 좋아하는 음식 */}
			<VoteCategory
				icon={
					<div
						className={twJoin(
							"ygi:flex ygi:items-center ygi:justify-center",
							"ygi:h-5 ygi:w-5 ygi:rounded",
							"ygi:bg-palette-secondary-500",
						)}
					>
						<CircleIcon size={11} className="ygi:text-white" />
					</div>
				}
				title="좋아하는 음식"
				votes={preferences}
			/>

			{/* 피하고 싶은 음식 */}
			<VoteCategory
				icon={
					<div
						className={twJoin(
							"ygi:flex ygi:items-center ygi:justify-center",
							"ygi:h-5 ygi:w-5 ygi:rounded",
							"ygi:bg-palette-primary-500",
						)}
					>
						<XIcon size={11} className="ygi:text-white" />
					</div>
				}
				title="피하고 싶은 음식"
				votes={dislikes}
			/>
		</section>
	);
};
