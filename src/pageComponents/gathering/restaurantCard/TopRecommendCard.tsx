"use client";

import type { SyntheticEvent } from "react";

import { trackRestaurantClick } from "#/components/analytics";
import { StarIcon } from "#/icons/starIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";
import type { Restaurant } from "#/types/gathering";
import {
	CATEGORY_LABEL,
	DISTANCE_RANGE_LABEL,
} from "#/constants/gathering/opinion";
import Image from "next/image";
import { Tag } from "#/components/tag";

export interface TopRecommendCardProps {
	restaurant: Restaurant;
}

export const TopRecommendCard = ({ restaurant }: TopRecommendCardProps) => {
	const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src =
			"/images/result/restaurant-image-placeholder.png";
	};

	const handleMapClick = () => {
		trackRestaurantClick({
			page_id: "추천_결과",
			restaurant_name: restaurant.restaurantName,
			rank_type: "top",
		});
		window.open(restaurant.mapUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<article
			className="ygi:flex ygi:flex-col ygi:items-start"
			aria-label={`1위 추천 음식점: ${restaurant.restaurantName}`}
		>
			<div className="ygi:relative ygi:h-46.5 ygi:w-full ygi:overflow-hidden ygi:rounded-t-xl ygi:bg-surface-lightgray">
				<Image
					src={
						restaurant.imageUrl ??
						"/images/result/restaurant-image-placeholder.png"
					}
					alt={restaurant.restaurantName ?? "준비 중"}
					fill
					className={
						restaurant.imageUrl
							? "ygi:object-cover"
							: "ygi:object-contain"
					}
					onError={handleImageError}
				/>
			</div>

			<div className="ygi:flex ygi:w-full ygi:flex-col ygi:gap-3 ygi:rounded-b-xl ygi:bg-surface-white ygi:p-5">
				<div className="ygi:flex ygi:flex-col ygi:gap-2">
					<button
						onClick={handleMapClick}
						className="ygi:inline-flex ygi:cursor-pointer ygi:items-center ygi:text-left"
					>
						<h3 className="ygi:body-18-bd ygi:text-text-primary">
							{restaurant.restaurantName}
						</h3>
						<ChevronRightIcon
							size={24}
							className="ygi:shrink-0 ygi:text-icon-disabled"
						/>
					</button>

					<div className="ygi:flex ygi:items-center ygi:gap-1">
						<StarIcon size={14} color="#FF5A3C" />
						<span className="ygi:body-14-bd ygi:text-text-secondary">
							{restaurant.rating.toFixed(1)}
						</span>
					</div>
				</div>

				<div className="ygi:flex ygi:flex-wrap ygi:gap-2">
					<Tag size="medium">
						{`역에서 ${DISTANCE_RANGE_LABEL[restaurant.majorityDistanceRange]}`}
					</Tag>
					<Tag size="medium">
						{CATEGORY_LABEL[restaurant.largeCategory]}
					</Tag>
				</div>
			</div>
		</article>
	);
};
