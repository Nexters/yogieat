"use client";

import Image from "next/image";

import type { RestaurantDetail } from "#/apis/restaurant";

const PLACEHOLDER_SRC = "/images/result/restaurant-image-placeholder.png";

interface HeroImageSectionProps {
	restaurant: RestaurantDetail;
}

export const HeroImageSection = ({ restaurant }: HeroImageSectionProps) => {
	return (
		<div className="ygi:relative ygi:h-50 ygi:w-full ygi:overflow-clip ygi:bg-surface-lightgray">
			<Image
				src={restaurant.imageUrl ?? PLACEHOLDER_SRC}
				alt={restaurant.restaurantName}
				fill
				sizes="(max-width: 480px) 100vw, 480px"
				className="ygi:object-cover"
				priority
			/>
		</div>
	);
};
