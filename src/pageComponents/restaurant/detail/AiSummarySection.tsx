"use client";

import type { RestaurantDetail } from "#/apis/restaurant";

interface AiSummarySectionProps {
	restaurant: RestaurantDetail;
}

export const AiSummarySection = ({ restaurant }: AiSummarySectionProps) => {
	if (!restaurant.aiMateSummaryTitle || !restaurant.description) {
		return null;
	}

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3 ygi:px-5 ygi:py-4">
			<div className="ygi:flex ygi:flex-col ygi:gap-0.5">
				<span className="ygi:caption-12-md ygi:text-text-secondary">
					AI 추천 요약
				</span>
				<p className="ygi:body-16-bd ygi:text-text-primary">
					{restaurant.aiMateSummaryTitle}
				</p>
			</div>

			<div className="ygi:rounded-md ygi:bg-surface-lightgray ygi:p-4">
				<p className="ygi:caption-12-md ygi:break-keep ygi:text-text-primary">
					{restaurant.description}
				</p>
			</div>
		</section>
	);
};
