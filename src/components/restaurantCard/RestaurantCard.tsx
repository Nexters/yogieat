"use client";

import { CrownIcon } from "#/icons/crownIcon";
import { StarIcon } from "#/icons/starIcon";
import { ChevronRightIcon } from "#/icons/chevronRightIcon";
import type { Restaurant } from "#/types/gathering";
import {
	FOOD_CATEGORY_LABEL,
	DISTANCE_LABELS,
} from "#/constants/gathering/opinion";
import Image from "next/image";
import { Tag } from "../tag";

export interface RestaurantCardProps {
	restaurant: Restaurant;
	variant?: "featured" | "default";
	showRanking?: boolean;
	ranking?: number;
}

export const RestaurantCard = ({
	restaurant,
	variant = "default",
	showRanking = false,
	ranking,
}: RestaurantCardProps) => {
	const isFeatured = variant === "featured";

	const handleMapClick = () => {
		window.open(restaurant.mapUrl, "_blank", "noopener,noreferrer");
	};

	if (isFeatured) {
		return (
			<article
				className="ygi:flex ygi:flex-col ygi:items-start"
				aria-label={`${ranking}위 추천 음식점: ${restaurant.restaurantName}`}
			>
				<div className="ygi:relative ygi:h-46.5 ygi:w-full ygi:overflow-hidden ygi:rounded-t-xl ygi:bg-gray-200">
					{showRanking && ranking === 1 && (
						<div className="ygi:absolute ygi:top-4 ygi:left-4 ygi:z-10">
							<CrownIcon size={24} />
						</div>
					)}
					{restaurant.imageUrl ? (
						<Image
							src={restaurant.imageUrl}
							alt={restaurant.restaurantName}
							fill
							className="ygi:object-cover"
						/>
					) : (
						<div className="ygi:flex ygi:h-full ygi:items-center ygi:justify-center">
							<span className="ygi:text-text-tertiary ygi:body-14-rg">
								이미지 준비 중
							</span>
						</div>
					)}
				</div>

				<div className="ygi:flex ygi:w-full ygi:flex-col ygi:gap-3 ygi:rounded-b-xl ygi:bg-surface-white ygi:p-5">
					<div className="ygi:flex ygi:flex-col ygi:gap-2">
						<button
							onClick={handleMapClick}
							className="ygi:inline-flex ygi:cursor-pointer ygi:items-center ygi:text-left"
						>
							<h3 className="ygi:body-18-bd ygi:text-text-primary">
								{restaurant.restaurantName}
							</h3>
							<ChevronRightIcon
								size={24}
								className="ygi:shrink-0 ygi:text-icon-disabled"
							/>
						</button>

						{/* Rating */}
						<div className="ygi:flex ygi:items-center ygi:gap-1">
							<StarIcon size={14} color="#FF5A3C" />
							<span className="ygi:body-14-bd ygi:text-text-secondary">
								{restaurant.rating.toFixed(1)}
							</span>
						</div>
					</div>

					<div className="ygi:flex ygi:flex-wrap ygi:gap-2">
						<Tag size="medium">
							{`역에서 ${DISTANCE_LABELS[restaurant.majorityDistanceRange]}`}
						</Tag>
						<Tag size="medium">
							{FOOD_CATEGORY_LABEL[restaurant.largeCategory]}
						</Tag>
					</div>
				</div>
			</article>
		);
	}

	return (
		<article
			className="ygi:flex ygi:items-start ygi:overflow-hidden"
			aria-label={`${ranking}위 추천 음식점: ${restaurant.restaurantName}`}
		>
			<div className="ygi:relative ygi:h-20 ygi:w-20 ygi:shrink-0 ygi:overflow-hidden ygi:rounded ygi:bg-gray-200">
				{restaurant.imageUrl ? (
					<Image
						src={restaurant.imageUrl}
						alt={restaurant.restaurantName}
						fill
						className="ygi:object-cover"
					/>
				) : (
					<div className="ygi:flex ygi:h-full ygi:items-center ygi:justify-center">
						<span className="ygi:text-text-tertiary ygi:text-xs">
							준비 중
						</span>
					</div>
				)}
			</div>

			<div className="ygi:flex ygi:flex-1 ygi:flex-col ygi:justify-center ygi:gap-2 ygi:px-5">
				<button
					onClick={handleMapClick}
					className="ygi:flex ygi:items-center ygi:text-left"
				>
					<h3 className="ygi:body-14-bd ygi:text-text-primary">
						{restaurant.restaurantName}
					</h3>
					<ChevronRightIcon
						size={24}
						className="ygi:text-text-primary"
					/>
				</button>

				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<StarIcon size={14} color="#FF5A3C" />
					<span className="ygi:body-14-bd ygi:text-text-secondary">
						{restaurant.rating.toFixed(1)}
					</span>
				</div>

				<div className="ygi:flex ygi:flex-wrap ygi:gap-2">
					<Tag size="medium">
						{`역에서 ${DISTANCE_LABELS[restaurant.majorityDistanceRange]}`}
					</Tag>
					<Tag size="medium">
						{FOOD_CATEGORY_LABEL[restaurant.largeCategory]}
					</Tag>
				</div>
			</div>
		</article>
	);
};
