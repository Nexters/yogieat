"use client";

import { useRerollRestaurants } from "#/hooks/gathering";
import type { Restaurant } from "#/types/gathering";

import { RerollButton } from "./RerollButton";
import { RestaurantList } from "./RestaurantList";

interface RecommendedRestaurantSectionProps {
	accessKey: string;
	initialList: Restaurant[];
}

export const RecommendedRestaurantSection = ({
	accessKey,
	initialList,
}: RecommendedRestaurantSectionProps) => {
	const { displayList, isPending, isMaxReached, handleReroll } =
		useRerollRestaurants({ accessKey, initialList, maxRerollCount: 2 });

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-3">
			<h2 className="ygi:heading-22-bd ygi:text-text-primary">
				약속 장소는 여기 어때요?
			</h2>

			<div className="ygi:space-y-4 ygi:rounded-md ygi:bg-surface-white ygi:p-4">
				<p className="ygi:body-16-bd ygi:text-text-primary">
					요기잇 추천 맛집
				</p>
				<RestaurantList restaurants={displayList} />
			</div>

			<RerollButton
				isMaxReached={isMaxReached}
				isPending={isPending}
				onReroll={handleReroll}
			/>
		</section>
	);
};
