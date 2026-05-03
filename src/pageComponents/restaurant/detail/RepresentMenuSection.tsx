"use client";

import type { RestaurantDetail } from "#/apis/restaurant";

const formatKrw = (value: number) => `${value.toLocaleString("ko-KR")}원`;

interface RepresentMenuSectionProps {
	restaurant: RestaurantDetail;
}

export const RepresentMenuSection = ({
	restaurant,
}: RepresentMenuSectionProps) => {
	if (!restaurant.representMenu) {
		return null;
	}

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-1 ygi:bg-surface-white ygi:px-5 ygi:py-4">
			<span className="ygi:caption-12-md ygi:text-text-secondary">
				먹어야 할 대표 음식
			</span>
			<div className="ygi:flex ygi:items-center ygi:justify-between ygi:body-16-bd ygi:text-text-primary">
				<p>{restaurant.representMenu}</p>
				{restaurant.representMenuPrice !== null && (
					<p>{formatKrw(restaurant.representMenuPrice)}</p>
				)}
			</div>
		</section>
	);
};
