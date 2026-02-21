"use client";

import { Layout } from "#/components/layout";
import { OtherCandidateCard } from "#/pageComponents/gathering/restaurantCard";
import type { RecommendationResult } from "#/types/gathering";
import { twJoin } from "tailwind-merge";
import { ProgressBar } from "#/components/progressBar";
import { CircleIcon } from "#/icons/circleIcon";
import { XIcon } from "#/icons/xIcon";
import { FOOD_CATEGORY_LABEL, REGION_LABEL, TIME_SLOT_LABEL } from "#/constants/gathering/opinion";
import type { FoodCategory } from "#/types/gathering";
import { parse, format } from "date-fns";

export interface ResultViewProps {
	recommendationResult: RecommendationResult;
}

interface VoteListProps {
	votes: Record<string, number>;
}

const VoteList = ({ votes }: VoteListProps) => {
	const sortedVotes = Object.entries(votes)
		.map(([category, count]) => ({
			category: category as FoodCategory,
			count,
		}))
		.sort((a, b) => b.count - a.count);

	return (
		<div className="ygi:flex ygi:flex-wrap ygi:items-center ygi:gap-4">
			{sortedVotes.map((vote) => (
				<div
					key={vote.category}
					className="ygi:flex ygi:items-center ygi:gap-1"
				>
					<span className="ygi:body-14-md ygi:text-text-secondary">
						{FOOD_CATEGORY_LABEL[vote.category]}
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
	);
};

const formatScheduledDate = (dateStr: string): string => {
	const date = parse(dateStr, "yyyy-MM-dd", new Date());
	return format(date, "M월 d일");
};

export const ResultView = ({ recommendationResult }: ResultViewProps) => {
	return (
		<Layout.Content background="gray">
			<div className="ygi:flex ygi:flex-col ygi:gap-3 ygi:px-6 ygi:pb-8">
				{/* Head Section */}
				<div className="ygi:flex ygi:flex-col ygi:gap-2 ygi:py-6">
					<span className="ygi:caption-12-rg ygi:text-text-secondary">
						{formatScheduledDate(recommendationResult.gathering.scheduledDate)}{" "}
						{REGION_LABEL[recommendationResult.gathering.region]}{" "}
						{TIME_SLOT_LABEL[recommendationResult.gathering.timeSlot]} 약속
					</span>
					<h1 className="ygi:heading-22-bd ygi:text-text-primary">
						여러분의 취향을 조합해보니...
					</h1>
				</div>

				{/* Restaurant List Section */}
				<section className="ygi:flex ygi:flex-col ygi:gap-3">
					<h2 className="ygi:heading-18-bd ygi:text-text-primary">
						약속 장소는 여기 어때요?
					</h2>
					<div className="ygi:rounded-xl ygi:bg-surface-white ygi:p-4">
						<span className="ygi:caption-12-sb ygi:text-text-secondary">
							요기잇 추천 맛집
						</span>
						<div className="ygi:mt-3 ygi:flex ygi:flex-col">
							{[
								recommendationResult.topRecommendation,
								...recommendationResult.otherCandidates,
							].map((restaurant, index, arr) => (
								<div key={restaurant.restaurantId}>
									<OtherCandidateCard
										restaurant={restaurant}
										ranking={index + 1}
									/>
									{index < arr.length - 1 && (
										<div className="ygi:my-4 ygi:h-px ygi:bg-border-default" />
									)}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Vote Summary Section */}
				<section
					className={twJoin(
						"ygi:rounded-xl ygi:bg-surface-white",
						"ygi:flex ygi:flex-col ygi:gap-8 ygi:p-5",
					)}
				>
					{/* 의견 일치율 */}
					<div className="ygi:flex ygi:flex-col ygi:gap-5">
						<div className="ygi:flex ygi:items-start ygi:justify-between">
							<h5 className="ygi:flex-1 ygi:heading-18-bd ygi:text-text-primary">
								의견 일치율
							</h5>
							<span className="ygi:shrink-0 ygi:body-18-bd ygi:text-text-interactive">
								{Math.round(recommendationResult.agreementRate)}
								%
							</span>
						</div>
						<ProgressBar
							value={recommendationResult.agreementRate}
						/>
					</div>

					{/* Divider */}
					<div className="ygi:h-px ygi:bg-border-default" />

					{/* 좋아하는 음식 */}
					<div className="ygi:flex ygi:flex-col ygi:gap-4">
						<div className="ygi:flex ygi:items-center ygi:gap-2">
							<div
								className={twJoin(
									"ygi:flex ygi:items-center ygi:justify-center",
									"ygi:h-5 ygi:w-5 ygi:rounded",
									"ygi:bg-palette-secondary-500",
								)}
							>
								<CircleIcon
									size={11}
									className="ygi:text-white"
								/>
							</div>
							<h3 className="ygi:body-14-sb ygi:text-text-primary">
								좋아하는 음식
							</h3>
						</div>
						<VoteList votes={recommendationResult.preferences} />
					</div>

					{/* 피하고 싶은 음식 */}
					<div className="ygi:flex ygi:flex-col ygi:gap-4">
						<div className="ygi:flex ygi:items-center ygi:gap-2">
							<div
								className={twJoin(
									"ygi:flex ygi:items-center ygi:justify-center",
									"ygi:h-5 ygi:w-5 ygi:rounded",
									"ygi:bg-palette-primary-500",
								)}
							>
								<XIcon size={11} className="ygi:text-white" />
							</div>
							<h3 className="ygi:body-14-sb ygi:text-text-primary">
								피하고 싶은 음식
							</h3>
						</div>
						<VoteList votes={recommendationResult.dislikes} />
					</div>
				</section>
			</div>
		</Layout.Content>
	);
};
