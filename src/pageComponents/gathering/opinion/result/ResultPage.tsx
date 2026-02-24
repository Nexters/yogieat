"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parse } from "date-fns";

import { BackwardButton } from "#/components/backwardButton";
import { trackShareClick, trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { ProgressBar } from "#/components/progressBar";
import { ShareButton } from "#/components/shareButton";
import { Toaster } from "#/components/toast";
import {
	FOOD_CATEGORY_LABEL,
	REGION_LABEL,
	TIME_SLOT_LABEL,
} from "#/constants/gathering/opinion";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";
import { CircleIcon } from "#/icons/circleIcon";
import { XIcon } from "#/icons/xIcon";
import { OtherCandidateCard } from "#/pageComponents/gathering/restaurantCard";
import type { FoodCategory } from "#/types/gathering";

const PAGE_ID = "추천_결과";

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
					<span className="ygi:rounded ygi:bg-surface-primary ygi:px-1 ygi:py-0.5 ygi:caption-12-sb ygi:text-text-interactive">
						{vote.count}표
					</span>
				</div>
			))}
		</div>
	);
};

const formatScheduledDate = (dateStr: string): string => {
	try {
		const date = parse(dateStr, "yyyy-MM-dd", new Date());
		return format(date, "M월 d일");
	} catch {
		return "";
	}
};

export function ResultPage() {
	const router = useRouter();
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: recommendationResult } = useGetRecommendResult(accessKey);

	const handleClickBackward = () => {
		router.push(`/gathering/${accessKey}/opinion/complete`);
	};

	const handleShare = () => {
		trackShareClick({ page_id: PAGE_ID, share_location: "Footer" });
	};

	useEffect(() => {
		if (recommendationResult && accessKey) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: accessKey,
			});
		}
	}, [recommendationResult, accessKey]);

	return (
		<Layout.Root>
			<Layout.Header background="gray">
				<BackwardButton onClick={handleClickBackward} />
			</Layout.Header>

			<Layout.Content background="gray">
				<div className="ygi:flex ygi:flex-col ygi:gap-3 ygi:px-6 ygi:pb-8">
					{/* Head Section */}
					<div className="ygi:flex ygi:flex-col ygi:gap-2 ygi:pt-3 ygi:pb-6">
						<span className="ygi:body-16-md ygi:text-text-secondary">
							{formatScheduledDate(
								recommendationResult.gathering.scheduledDate,
							)}{" "}
							{
								REGION_LABEL[
									recommendationResult.gathering.region
								]
							}{" "}
							{
								TIME_SLOT_LABEL[
									recommendationResult.gathering.timeSlot
								]
							}{" "}
							약속
						</span>
						<h1 className="ygi:heading-22-bd ygi:text-text-primary">
							여러분의 취향을 조합해보니...
						</h1>
					</div>

					{/* Restaurant List Section */}
					<section className="ygi:flex ygi:flex-col ygi:gap-3">
						<h2 className="ygi:heading-22-bd ygi:text-text-primary">
							약속 장소는 여기 어때요?
						</h2>
						<div className="ygi:space-y-4 ygi:rounded-md ygi:bg-surface-white ygi:p-4">
							<p className="ygi:body-16-bd ygi:text-text-primary">
								요기잇 추천 맛집
							</p>
							<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:divide-y ygi:divide-dashed ygi:divide-border-default">
								{[
									recommendationResult.topRecommendation,
									...recommendationResult.otherCandidates,
								].map((restaurant, index) => (
									<div
										key={restaurant.restaurantId}
										className="ygi:not-last:pb-4"
									>
										<OtherCandidateCard
											restaurant={restaurant}
											ranking={index + 1}
										/>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Vote Summary Section */}
					<section className="ygi:flex ygi:flex-col ygi:gap-8 ygi:rounded-xl ygi:bg-surface-white ygi:p-5">
						{/* 의견 일치율 */}
						<div className="ygi:flex ygi:flex-col ygi:gap-5">
							<div className="ygi:flex ygi:items-start ygi:justify-between">
								<h5 className="ygi:flex-1 ygi:heading-18-bd ygi:text-text-primary">
									의견 일치율
								</h5>
								<span className="ygi:shrink-0 ygi:body-18-bd ygi:text-text-interactive">
									{Math.round(
										recommendationResult.agreementRate,
									)}
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
								<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-secondary-500">
									<CircleIcon
										size={11}
										className="ygi:text-white"
									/>
								</div>
								<h3 className="ygi:body-14-sb ygi:text-text-primary">
									좋아하는 음식
								</h3>
							</div>
							<VoteList
								votes={recommendationResult.preferences}
							/>
						</div>

						{/* 피하고 싶은 음식 */}
						<div className="ygi:flex ygi:flex-col ygi:gap-4">
							<div className="ygi:flex ygi:items-center ygi:gap-2">
								<div className="ygi:flex ygi:h-5 ygi:w-5 ygi:items-center ygi:justify-center ygi:rounded ygi:bg-palette-primary-500">
									<XIcon
										size={11}
										className="ygi:text-white"
									/>
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

			<Layout.Footer background="gray">
				<div className="ygi:px-6">
					<ShareButton onShare={handleShare} />
				</div>
			</Layout.Footer>

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
