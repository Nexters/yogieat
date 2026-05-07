"use client";

import { twJoin } from "tailwind-merge";

import type { RestaurantDetail } from "#/apis/restaurant";

interface ReviewSectionProps {
	restaurant: RestaurantDetail;
}

export const ReviewSection = ({ restaurant }: ReviewSectionProps) => {
	const handleOpenMap = () => {
		window.open(restaurant.mapUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-4 ygi:bg-surface-white ygi:px-5 ygi:py-4">
			<div className="ygi:flex ygi:flex-col ygi:gap-0.5">
				<span className="ygi:caption-12-md ygi:text-text-secondary">
					이 맛집에 대한 리뷰가
				</span>
				<p className="ygi:body-16-bd ygi:text-text-primary">
					{restaurant.reviewCount}개가 쌓여있어요
				</p>
			</div>

			{restaurant.representativeReview && (
				<div className="ygi:flex ygi:flex-col">
					<div className="ygi:flex ygi:flex-col ygi:gap-0.5 ygi:rounded-t-md ygi:bg-surface-lightgray ygi:p-4">
						<span className="ygi:caption-12-md ygi:text-text-secondary">
							대표 리뷰
						</span>
						<p className="ygi:caption-12-md ygi:break-keep ygi:whitespace-pre-line ygi:text-text-primary">
							{restaurant.representativeReview}
						</p>
					</div>
					<button
						type="button"
						onClick={handleOpenMap}
						className={twJoin(
							"ygi:flex ygi:items-center ygi:justify-center",
							"ygi:rounded-b-md ygi:bg-bg-gray ygi:px-6 ygi:py-4",
							"ygi:caption-12-md ygi:text-text-secondary",
							"ygi:cursor-pointer",
						)}
					>
						리뷰 더보기
					</button>
				</div>
			)}
		</section>
	);
};
