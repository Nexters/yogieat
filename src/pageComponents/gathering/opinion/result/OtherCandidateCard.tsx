"use client";

import { trackRestaurantClick } from "#/components/analytics";
import { StarIcon } from "#/icons/starIcon";
import type { Restaurant } from "#/types/gathering";
import {
	CATEGORY_LABEL,
	DISTANCE_RANGE_WALKING_MINUTES,
} from "#/constants/gathering/opinion";
import Image from "next/image";
import { Tag } from "#/components/tag";

export interface OtherCandidateCardProps {
	restaurant: Restaurant;
	ranking: number;
}

export const OtherCandidateCard = ({
	restaurant,
	ranking,
}: OtherCandidateCardProps) => {
	const handleMapClick = () => {
		trackRestaurantClick({
			page_id: "추천_결과",
			restaurant_name: restaurant.restaurantName,
			rank_type: "other",
		});
		window.open(restaurant.mapUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<article
			className="ygi:flex ygi:cursor-pointer ygi:items-start ygi:gap-5 ygi:overflow-hidden"
			aria-label={`${ranking}위 추천 음식점: ${restaurant.restaurantName}`}
			onClick={handleMapClick}
		>
			<div className="ygi:relative ygi:h-20 ygi:w-20 ygi:shrink-0 ygi:overflow-clip ygi:rounded-xs  ygi:border ygi:border-solid ygi:border-border-default ygi:bg-surface-lightgray">
				<Image
					src={
						restaurant.imageUrl ??
						"/images/result/restaurant-image-placeholder.png"
					}
					alt={restaurant.restaurantName ?? "준비 중"}
					fill
					className="ygi:object-cover"
				/>
			</div>

			<div className="ygi:flex ygi:flex-1 ygi:flex-col ygi:justify-center">
				<h3 className="ygi:mb-1 ygi:body-14-bd ygi:text-text-primary">
					{restaurant.restaurantName}
				</h3>

				<div className="ygi:mb-2 ygi:flex ygi:items-center ygi:gap-1">
					<StarIcon size={14} color="#FF5A3C" />
					<span className="ygi:body-14-bd ygi:text-text-secondary">
						{restaurant.rating.toFixed(1)} ({restaurant.reviewCount}
						)
					</span>
				</div>

				<div className="ygi:flex ygi:flex-wrap ygi:gap-2">
					<Tag size="medium" theme="secondary">
						{CATEGORY_LABEL[restaurant.largeCategory]}
					</Tag>
					{restaurant.majorityDistanceRange !== "ANY" && (
						<Tag size="medium" theme="secondary">
							{`역에서 도보 ${DISTANCE_RANGE_WALKING_MINUTES[restaurant.majorityDistanceRange as keyof typeof DISTANCE_RANGE_WALKING_MINUTES]}분`}
						</Tag>
					)}
				</div>
			</div>
		</article>
	);
};
