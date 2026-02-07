"use client";

import { StarIcon } from "#/icons/starIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";
import type { Restaurant } from "#/types/gathering";
import {
	FOOD_CATEGORY_LABEL,
	DISTANCE_RANGE_LABEL,
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
		window.open(restaurant.mapUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<article
			className="ygi:flex ygi:items-start ygi:overflow-hidden"
			aria-label={`${ranking}위 추천 음식점: ${restaurant.restaurantName}`}
		>
			<div className="ygi:relative ygi:h-20 ygi:w-20 ygi:shrink-0 ygi:overflow-clip ygi:rounded ygi:border ygi:border-border-default ygi:bg-surface-lightgray">
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

			<div className="ygi:flex ygi:flex-1 ygi:flex-col ygi:justify-center ygi:gap-2 ygi:px-5">
				<button
					onClick={handleMapClick}
					className="ygi:flex ygi:cursor-pointer ygi:items-center ygi:text-left"
				>
					<h3 className="ygi:body-14-bd ygi:text-text-primary">
						{restaurant.restaurantName}
					</h3>
					<ChevronRightIcon
						size={24}
						className="ygi:text-text-primary"
					/>
				</button>

				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<StarIcon size={14} color="#FF5A3C" />
					<span className="ygi:body-14-bd ygi:text-text-secondary">
						{restaurant.rating.toFixed(1)}
					</span>
				</div>

				<div className="ygi:flex ygi:flex-wrap ygi:gap-2">
					<Tag size="medium">
						{`역에서 ${DISTANCE_RANGE_LABEL[restaurant.majorityDistanceRange]}`}
					</Tag>
					<Tag size="medium">
						{FOOD_CATEGORY_LABEL[restaurant.largeCategory]}
					</Tag>
				</div>
			</div>
		</article>
	);
};
