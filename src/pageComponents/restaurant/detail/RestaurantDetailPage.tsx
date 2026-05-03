"use client";

import { useParams } from "next/navigation";

import { useGetRestaurantDetail } from "#/hooks/apis/restaurant";

import { AiSummarySection } from "./AiSummarySection";
import { HeroImageSection } from "./HeroImageSection";
import { OverviewSection } from "./OverviewSection";

export const RestaurantDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data: restaurant } = useGetRestaurantDetail(id);

	return (
		<>
			<HeroImageSection restaurant={restaurant} />
			<OverviewSection restaurant={restaurant} />
			<AiSummarySection restaurant={restaurant} />
			<pre style={{ padding: 16, fontSize: 12 }}>
				{JSON.stringify(restaurant, null, 2)}
			</pre>
		</>
	);
};
