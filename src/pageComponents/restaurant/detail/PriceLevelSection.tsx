"use client";

import {
	getActivePriceLevelCount,
	MAX_PRICE_LEVEL,
	PRICE_LEVEL_LABEL,
	type PriceLevelStep,
} from "#/constants/restaurant";
import type { Restaurant } from "#/types/gathering";

import { PriceLevelCoin } from "./PriceLevelCoin";

interface PriceLevelSectionProps {
	restaurant: Restaurant;
}

export const PriceLevelSection = ({ restaurant }: PriceLevelSectionProps) => {
	const activeCount = getActivePriceLevelCount(restaurant.priceLevel);

	if (activeCount === 0) {
		return null;
	}

	const label = PRICE_LEVEL_LABEL[activeCount as PriceLevelStep];

	return (
		<section className="ygi:flex ygi:flex-col ygi:gap-1 ygi:bg-surface-white ygi:px-5 ygi:py-4">
			<span className="ygi:body-12-md ygi:text-text-secondary">
				평균 대비 가격은
			</span>
			<div className="ygi:flex ygi:items-center ygi:justify-between">
				<p className="ygi:body-16-bd ygi:text-text-primary">{label}</p>
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					{Array.from({ length: MAX_PRICE_LEVEL }, (_, index) => (
						<PriceLevelCoin
							key={index}
							active={index < activeCount}
						/>
					))}
				</div>
			</div>
		</section>
	);
};
