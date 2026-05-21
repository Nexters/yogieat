"use client";

import type { Restaurant } from "#/types/gathering";

import { RestaurantCarousel } from "./RestaurantCarousel";

interface RecommendedRestaurantSectionProps {
	accessKey: string;
	initialList: Restaurant[];
}

export const RecommendedRestaurantSection = ({
	accessKey,
	initialList,
}: RecommendedRestaurantSectionProps) => {
	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3">
			<h2 className="ygi:heading-22-bd ygi:text-text-primary">
				약속 장소는 여기 어때요?
			</h2>

			<RestaurantCarousel
				accessKey={accessKey}
				initialList={initialList}
				maxRerollCount={2}
			/>
		</section>
	);
};
