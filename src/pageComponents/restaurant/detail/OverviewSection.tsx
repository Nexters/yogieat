"use client";

import { CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { CheckIcon } from "#/icons/checkIcon";
import { MapPinIcon } from "#/icons/mapPinIcon";
import { StarIcon } from "#/icons/starIcon";
import type { Restaurant } from "#/types/gathering";

interface OverviewSectionProps {
	restaurant: Restaurant;
}

export const OverviewSection = ({ restaurant }: OverviewSectionProps) => {
	const categoryLabel =
		CATEGORY_LABEL[restaurant.largeCategory as keyof typeof CATEGORY_LABEL];
	const locationLine = [restaurant.region, restaurant.address]
		.filter(Boolean)
		.join(" · ");
	const aiLine = restaurant.aiMateSummaryContents.join(" · ");

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-2 ygi:bg-surface-white ygi:px-5 ygi:py-4">
			<div className="ygi:flex ygi:items-center ygi:gap-2">
				<h1 className="ygi:heading-18-bd ygi:text-text-primary">
					{restaurant.restaurantName}
				</h1>
				{categoryLabel && (
					<span className="ygi:body-14-md ygi:text-text-placeholder">
						{categoryLabel}
					</span>
				)}
			</div>

			<div className="ygi:flex ygi:items-center ygi:gap-1">
				<StarIcon size={14} color="#FF5A3C" />
				<span className="ygi:body-14-bd ygi:text-text-secondary">
					{restaurant.rating.toFixed(1)} ({restaurant.reviewCount})
				</span>
			</div>

			<div className="ygi:flex ygi:flex-col ygi:gap-1">
				{locationLine && (
					<div className="ygi:body-12-md ygi:flex ygi:items-center ygi:gap-1.5 ygi:text-text-primary">
						<MapPinIcon size={16} color="currentColor" />
						<span className="ygi:truncate">{locationLine}</span>
					</div>
				)}

				{restaurant.aiMateSummaryContents.length > 0 && (
					<div className="ygi:body-12-md ygi:flex ygi:items-start ygi:gap-1.5 ygi:text-text-primary">
						<span className="ygi:flex ygi:h-[18px] ygi:shrink-0 ygi:items-center">
							<CheckIcon size={16} color="currentColor" />
						</span>
						<span className="ygi:break-keep">{aiLine}</span>
					</div>
				)}
			</div>
		</section>
	);
};
