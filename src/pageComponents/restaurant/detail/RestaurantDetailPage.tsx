"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { trackViewPage } from "#/components/analytics";
import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { Toaster } from "#/components/toast";
import { useGetRestaurantDetail } from "#/hooks/apis/restaurant";

import { AiSummarySection } from "./AiSummarySection";
import { HeroImageSection } from "./HeroImageSection";
import { OverviewSection } from "./OverviewSection";
import { PriceLevelSection } from "./PriceLevelSection";
import { RepresentMenuSection } from "./RepresentMenuSection";
import { ReviewSection } from "./ReviewSection";
import { ShareFooter } from "./ShareFooter";

const PAGE_ID = "맛집_상세";
const FOOTER_OFFSET = 96;

export const RestaurantDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const { data: restaurant } = useGetRestaurantDetail(id);

	useEffect(() => {
		trackViewPage({
			page_id: PAGE_ID,
			restaurant_id: restaurant.restaurantId,
			restaurant_name: restaurant.restaurantName,
		});
	}, [restaurant.restaurantId, restaurant.restaurantName]);

	const handleBack = () => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			router.back();
			return;
		}
		router.push("/");
	};

	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton onClick={handleBack} />
			</Layout.Header>

			<Layout.Content background="gray">
				<div className="ygi:flex ygi:flex-col ygi:gap-2">
					<HeroImageSection restaurant={restaurant} />

					<div className="ygi:flex ygi:flex-col ygi:divide-y ygi:divide-dashed ygi:divide-border-default ygi:bg-surface-white">
						<OverviewSection restaurant={restaurant} />
						<AiSummarySection restaurant={restaurant} />
					</div>

					<div className="ygi:flex ygi:flex-col ygi:divide-y ygi:divide-dashed ygi:divide-border-default ygi:bg-surface-white">
						<PriceLevelSection restaurant={restaurant} />
						<RepresentMenuSection restaurant={restaurant} />
					</div>

					<ReviewSection restaurant={restaurant} />
				</div>
			</Layout.Content>

			<ShareFooter
				restaurantId={id}
				restaurantName={restaurant.restaurantName}
				restaurantAddress={restaurant.address}
				pageId={PAGE_ID}
			/>

			<Toaster
				offset={{ bottom: FOOTER_OFFSET }}
				mobileOffset={{ bottom: FOOTER_OFFSET }}
			/>
		</Layout.Root>
	);
};
