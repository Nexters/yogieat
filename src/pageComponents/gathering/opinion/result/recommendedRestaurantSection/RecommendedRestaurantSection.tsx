"use client";

import type { Restaurant } from "#/types/gathering";

import { RestaurantCarousel } from "./RestaurantCarousel";

interface RecommendedRestaurantSectionProps {
	accessKey: string;
	initialList: Restaurant[];
}

const MAX_REROLL_COUNT = 2;

export const RecommendedRestaurantSection = ({
	accessKey,
	initialList,
}: RecommendedRestaurantSectionProps) => {
	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3">
			<h2 className="ygi:heading-22-bd ygi:text-text-primary">
				약속 장소는 여기 어때요?
			</h2>

			<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:rounded-md ygi:bg-surface-white ygi:p-4">
				<p className="ygi:body-16-bd ygi:text-text-primary">
					우리가 다 좋아할, 취향 저격 맛집
				</p>
				<RestaurantCarousel
					accessKey={accessKey}
					initialList={initialList}
					maxRerollCount={MAX_REROLL_COUNT}
				/>
			</div>
		</section>
	);
};
