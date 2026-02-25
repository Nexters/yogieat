"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parse } from "date-fns";

import { BackwardButton } from "#/components/backwardButton";
import { trackShareClick, trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { Toaster } from "#/components/toast";
import { REGION_LABEL, TIME_SLOT_LABEL } from "#/constants/gathering/opinion";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";

import { TasteSummaryCard } from "./TasteSummaryCard";
import { VoteSummarySection } from "./VoteSummarySection";
import { OtherCandidateCard } from "./OtherCandidateCard";

const PAGE_ID = "추천_결과";

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
				<div className="ygi:flex ygi:flex-col ygi:gap-7 ygi:px-6 ygi:pb-8">
					{/* Head Section */}
					<div className="ygi:flex ygi:flex-col ygi:gap-2 ygi:pt-3">
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

					{/* Taste Summary Section */}
					<TasteSummaryCard
						preferences={recommendationResult.preferences}
						dislikes={recommendationResult.dislikes}
					/>

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
					<VoteSummarySection
						preferences={recommendationResult.preferences}
						dislikes={recommendationResult.dislikes}
						distances={recommendationResult.distances}
					/>
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
