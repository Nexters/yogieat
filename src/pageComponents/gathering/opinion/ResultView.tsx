"use client";

import { Layout } from "#/components/layout";
import {
	TopRecommendCard,
	OtherCandidateCard,
} from "#/components/restaurantCard";
import { VoteSummarySection } from "./VoteSummarySection";
import type { RecommendationResult } from "#/types/gathering";
import { twJoin } from "tailwind-merge";
import { Chip } from "#/components/chip";
import { CrownIcon } from "#/icons/crownIcon";

export interface ResultViewProps {
	gatheringId: string;
	recommendationResult: RecommendationResult;
}

export const ResultView = ({ recommendationResult }: ResultViewProps) => {
	return (
		<Layout.Content background="gray">
			<div className="ygi:flex ygi:flex-col ygi:gap-3 ygi:px-6 ygi:pb-3">
				{/* Header */}
				<div className="ygi:pt-6 ygi:pb-3">
					<div className="ygi:flex ygi:items-center ygi:gap-2">
						<Chip selected>
							<CrownIcon size={16} /> 1위
						</Chip>
						<h1 className="ygi:heading-22-bd ygi:text-text-primary">
							요기잇의 추천 맛집
						</h1>
					</div>
				</div>

				{/* Top Recommendation */}
				<TopRecommendCard
					restaurant={recommendationResult.topRecommendation}
				/>

				{/* Vote Summary */}
				<VoteSummarySection
					preferences={recommendationResult.preferences}
					dislikes={recommendationResult.dislikes}
					agreementRate={recommendationResult.agreementRate}
				/>

				{/* Other Candidates */}
				{recommendationResult.otherCandidates.length > 0 && (
					<section
						className={twJoin(
							"ygi:flex ygi:flex-col ygi:gap-4",
							"ygi:rounded-xl ygi:bg-surface-white ygi:p-4",
						)}
					>
						<h3 className="ygi:body-14-bd ygi:text-text-primary">
							다른 후보 보기
						</h3>
						<div className="ygi:flex ygi:flex-col ygi:gap-5">
							{recommendationResult.otherCandidates.map(
								(restaurant, index) => (
									<OtherCandidateCard
										key={restaurant.restaurantId}
										restaurant={restaurant}
										ranking={index + 2}
									/>
								),
							)}
						</div>
					</section>
				)}
			</div>
		</Layout.Content>
	);
};
