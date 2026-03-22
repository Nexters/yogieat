"use client";

import { format, parse } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { twJoin } from "tailwind-merge";

import {
	trackCtaClick,
	trackShareClick,
	trackViewPage,
} from "#/components/analytics";
import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { ShareButton } from "#/components/shareButton";
import { Toaster } from "#/components/toast";
import { REGION_LABEL, TIME_SLOT_LABEL } from "#/constants/gathering/opinion";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";

import { RecommendedRestaurantSection } from "./recommendedRestaurantSection";
import { TasteSummaryCard } from "./TasteSummaryCard";
import { VoteSummarySection } from "./VoteSummarySection";

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

	// TODO: Top Recommendation 맛집과 Other Candidates 맛집 View 분리가 통합되면서 구분이 필요없어짐 -> API Response 도 하나의 필드로 구성되도 좋을 듯함.
	const initialRestaurantList = [
		recommendationResult.topRecommendation,
		...recommendationResult.otherCandidates,
	];

	const handleClickBackward = () => {
		router.push(`/gathering/${accessKey}/opinion/complete`);
	};

	const handleShare = () => {
		trackShareClick({ page_id: PAGE_ID, share_location: "Footer" });
	};

	const handleRecreateLink = () => {
		trackCtaClick({
			page_id: PAGE_ID,
			button_name: "모임 링크 다시 만들기",
		});
		router.push("/gathering/create");
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
				<div className="ygi:flex ygi:flex-col ygi:gap-7 ygi:px-6 ygi:pb-20">
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
					<RecommendedRestaurantSection
						accessKey={accessKey}
						initialList={initialRestaurantList}
					/>

					<VoteSummarySection
						preferences={recommendationResult.preferences}
						dislikes={recommendationResult.dislikes}
						distances={recommendationResult.distances}
					/>
				</div>
			</Layout.Content>

			<footer
				className={twJoin(
					"ygi:fixed ygi:bottom-0 ygi:left-0 ygi:z-layout-footer",
					"ygi:flex ygi:w-full ygi:items-center ygi:justify-center",
				)}
			>
				<div
					className={twJoin(
						"ygi:w-full ygi:max-w-root-layout ygi:bg-bg-gray",
						"ygi:pb-[env(safe-area-inset-bottom)]",
					)}
				>
					<div className="ygi:flex ygi:flex-col ygi:gap-1 ygi:px-6 ygi:py-4">
						<ShareButton onShare={handleShare} />
						<button
							type="button"
							onClick={handleRecreateLink}
							className={twJoin(
								"ygi:flex ygi:h-14 ygi:items-center ygi:justify-center",
								"ygi:body-16-md ygi:text-text-secondary ygi:underline",
								"ygi:cursor-pointer ygi:bg-transparent",
							)}
						>
							모임 링크 다시 만들기
						</button>
					</div>
				</div>
			</footer>

			<Toaster offset={{ bottom: 148 }} mobileOffset={{ bottom: 148 }} />
		</Layout.Root>
	);
}
