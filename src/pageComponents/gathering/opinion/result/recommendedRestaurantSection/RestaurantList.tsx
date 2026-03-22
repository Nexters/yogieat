"use client";

import type { Restaurant } from "#/types/gathering";

import { OtherCandidateCard } from "../OtherCandidateCard";

interface RestaurantListProps {
	restaurants: Restaurant[];
}

export const RestaurantList = ({ restaurants }: RestaurantListProps) => {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-4 ygi:divide-y ygi:divide-dashed ygi:divide-border-default">
			{restaurants.map((restaurant, index) => (
				<div
					key={restaurant.restaurantId}
					className="ygi:not-last:pb-4"
				>
					<OtherCandidateCard
						restaurant={restaurant}
						ranking={index + 1}
						rankType={index === 0 ? "top" : "other"}
					/>
				</div>
			))}
		</div>
	);
};
