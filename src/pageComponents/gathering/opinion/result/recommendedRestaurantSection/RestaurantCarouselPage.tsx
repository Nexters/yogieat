"use client";

import type { Restaurant } from "#/types/gathering";

import { RestaurantCard } from "./RestaurantCard";

type PageStatus = "ready" | "loading" | "error";

interface RestaurantCarouselPageProps {
	status: PageStatus;
	restaurants: Restaurant[];
	pageIndex: number;
	totalPages: number;
}

interface SlideProps {
	ariaLabel: string;
}

interface ReadySlideProps extends SlideProps {
	restaurants: Restaurant[];
}

const SkeletonCard = () => (
	<div className="ygi:flex ygi:items-start ygi:gap-5">
		<div className="ygi:h-20 ygi:w-20 ygi:shrink-0 ygi:animate-pulse ygi:rounded-xs ygi:bg-surface-lightgray" />
		<div className="ygi:flex ygi:flex-1 ygi:flex-col ygi:gap-2 ygi:py-1">
			<div className="ygi:h-4 ygi:w-1/2 ygi:animate-pulse ygi:rounded-xs ygi:bg-surface-lightgray" />
			<div className="ygi:h-3 ygi:w-3/4 ygi:animate-pulse ygi:rounded-xs ygi:bg-surface-lightgray" />
			<div className="ygi:h-3 ygi:w-1/3 ygi:animate-pulse ygi:rounded-xs ygi:bg-surface-lightgray" />
		</div>
	</div>
);

const ReadySlide = ({ restaurants, ariaLabel }: ReadySlideProps) => (
	<div
		role="group"
		aria-roledescription="slide"
		aria-label={ariaLabel}
		className="ygi:flex ygi:flex-col ygi:gap-4 ygi:divide-y ygi:divide-dashed ygi:divide-border-default"
	>
		{restaurants.map((restaurant) => (
			<div key={restaurant.restaurantId} className="ygi:not-last:pb-4">
				<RestaurantCard restaurant={restaurant} />
			</div>
		))}
	</div>
);

const LoadingSlide = ({ ariaLabel }: SlideProps) => (
	<div
		role="group"
		aria-roledescription="slide"
		aria-label={ariaLabel}
		className="ygi:flex ygi:flex-col ygi:gap-4 ygi:divide-y ygi:divide-dashed ygi:divide-border-default"
	>
		{[0, 1, 2].map((i) => (
			<div key={i} className="ygi:not-last:pb-4">
				<SkeletonCard />
			</div>
		))}
	</div>
);

const ErrorSlide = ({ ariaLabel }: SlideProps) => (
	<div
		role="group"
		aria-roledescription="slide"
		aria-label={ariaLabel}
		className="ygi:flex ygi:min-h-60 ygi:flex-col ygi:items-center ygi:justify-center ygi:gap-2 ygi:text-center"
	>
		<p className="ygi:body-14-md ygi:text-text-secondary">
			불러오기에 실패했어요.
		</p>
		<p className="ygi:caption-12-md ygi:text-text-secondary">
			다시 시도하려면 옆 페이지로 이동했다가 돌아와주세요.
		</p>
	</div>
);

export const RestaurantCarouselPage = ({
	status,
	restaurants,
	pageIndex,
	totalPages,
}: RestaurantCarouselPageProps) => {
	const ariaLabel = `${pageIndex + 1} / ${totalPages} 페이지`;

	if (status === "error") {
		return <ErrorSlide ariaLabel={ariaLabel} />;
	}

	if (status === "loading") {
		return <LoadingSlide ariaLabel={ariaLabel} />;
	}

	return <ReadySlide ariaLabel={ariaLabel} restaurants={restaurants} />;
};
