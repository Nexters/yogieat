"use client";

import Image from "next/image";
import Link from "next/link";

import { trackRestaurantClick } from "#/components/analytics";
import { CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { StarIcon } from "#/icons/starIcon";
import type { Restaurant } from "#/types/gathering";

interface RestaurantCardProps {
	restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
	const categoryLabel = CATEGORY_LABEL[restaurant.largeCategory];
	const aiTitle = restaurant.aiMateSummaryTitle?.trim();

	const handleClick = () => {
		trackRestaurantClick({
			page_id: "추천_결과",
			restaurant_id: restaurant.restaurantId,
			restaurant_name: restaurant.restaurantName,
			rank_type: "other",
		});
	};

	return (
		<Link
			href={`/restaurants/${restaurant.restaurantId}`}
			onClick={handleClick}
			aria-label={`추천 음식점: ${restaurant.restaurantName}`}
			className="ygi:flex ygi:cursor-pointer ygi:items-start ygi:gap-3 ygi:overflow-hidden"
		>
			<div className="ygi:relative ygi:h-20 ygi:w-20 ygi:shrink-0 ygi:overflow-clip ygi:rounded-xs ygi:border ygi:border-solid ygi:border-border-default ygi:bg-surface-lightgray">
				<Image
					src={
						restaurant.imageUrl ??
						"/images/result/restaurant-image-placeholder.png"
					}
					alt={restaurant.restaurantName}
					fill
					className="ygi:object-cover"
				/>
			</div>

			<div className="ygi:flex ygi:min-w-0 ygi:flex-1 ygi:flex-col ygi:gap-1">
				<div className="ygi:flex ygi:items-baseline ygi:gap-1.5 ygi:overflow-hidden">
					<h3 className="ygi:min-w-0 ygi:truncate ygi:body-14-bd ygi:text-text-primary">
						{restaurant.restaurantName}
					</h3>
					<span className="ygi:shrink-0 ygi:caption-12-md ygi:text-text-secondary">
						{categoryLabel}
					</span>
				</div>

				{aiTitle && (
					<p className="ygi:caption-12-md ygi:break-keep ygi:text-text-secondary">
						{aiTitle}
					</p>
				)}

				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<StarIcon size={14} color="#FF5A3C" />
					<span className="ygi:body-14-bd ygi:text-text-secondary">
						{restaurant.rating.toFixed(1)} ({restaurant.reviewCount}
						)
					</span>
				</div>
			</div>
		</Link>
	);
};
