"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

import { BackwardButton } from "#/components/backwardButton";
import { CheckBox } from "#/components/checkbox";
import { Layout } from "#/components/layout";
import { CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { useGetRecommendResultRestaurantList } from "#/hooks/apis/recommendResult";
import type { Restaurant } from "#/types/gathering";

import { RandomPickDrumrollPage } from "./RandomPickDrumrollPage";

interface RestaurantSelectItemProps {
	restaurant: Restaurant;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}

const RestaurantSelectItem = ({
	restaurant,
	checked,
	onCheckedChange,
}: RestaurantSelectItemProps) => {
	const categoryLabel = CATEGORY_LABEL[restaurant.largeCategory];

	return (
		<CheckBox.Root
			checked={checked}
			onCheckedChange={onCheckedChange}
			className={twJoin(
				"ygi:flex ygi:w-full ygi:items-center ygi:gap-3",
				"ygi:border-b ygi:border-border-default ygi:last:border-none",
				"ygi:bg-surface-white ygi:px-6 ygi:py-5 ygi:text-left",
			)}
		>
			<CheckBox.Indicator />
			<div className="ygi:flex ygi:items-center ygi:gap-2">
				<span className="ygi:body-16-sb ygi:text-text-primary">
					{restaurant.restaurantName}
				</span>
				{categoryLabel && (
					<span className="ygi:body-14-md ygi:text-text-placeholder">
						{categoryLabel}
					</span>
				)}
			</div>
		</CheckBox.Root>
	);
};

export const RandomPickSelectPage = () => {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();
	const { data: restaurants } =
		useGetRecommendResultRestaurantList(accessKey);

	const [selectedIds, setSelectedIds] = useState<Set<number>>(
		() => new Set(restaurants.map((r) => r.restaurantId)),
	);
	const [pickedRestaurantId, setPickedRestaurantId] = useState<number | null>(
		null,
	);

	const handleToggle = (restaurantId: number, checked: boolean) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (checked) {
				next.add(restaurantId);
			} else {
				next.delete(restaurantId);
			}
			return next;
		});
	};

	const handleRandomPick = () => {
		const selected = restaurants.filter((r) =>
			selectedIds.has(r.restaurantId),
		);
		if (selected.length === 0) return;

		const picked = selected[Math.floor(Math.random() * selected.length)];
		setPickedRestaurantId(picked.restaurantId);
	};

	const handleBack = () => {
		router.push(`/gathering/${accessKey}/opinion/result`);
	};

	const selectedCount = selectedIds.size;

	if (pickedRestaurantId !== null) {
		return (
			<RandomPickDrumrollPage
				accessKey={accessKey}
				restaurantId={pickedRestaurantId}
			/>
		);
	}

	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton onClick={handleBack} />
			</Layout.Header>

			<Layout.Content background="white">
				<div className="ygi:flex ygi:flex-col ygi:pb-28">
					<div className="ygi:px-6 ygi:pt-3 ygi:pb-6">
						<h1 className="ygi:heading-22-bd ygi:text-text-primary">
							랜덤 뽑기할 맛집을 선택해주세요
						</h1>
					</div>

					<div className="ygi:flex ygi:flex-col">
						{restaurants.map((restaurant) => (
							<RestaurantSelectItem
								key={restaurant.restaurantId}
								restaurant={restaurant}
								checked={selectedIds.has(
									restaurant.restaurantId,
								)}
								onCheckedChange={(checked) =>
									handleToggle(
										restaurant.restaurantId,
										checked,
									)
								}
							/>
						))}
					</div>
				</div>
			</Layout.Content>

			<footer
				className={twJoin(
					"ygi:fixed ygi:bottom-0 ygi:left-0 ygi:z-layout-footer",
					"ygi:flex ygi:w-full ygi:items-center ygi:justify-center",
				)}
			>
				<div
					className={twJoin(
						"ygi:w-full ygi:max-w-root-layout ygi:bg-bg-white",
						"ygi:pb-[env(safe-area-inset-bottom)]",
					)}
				>
					<div className="ygi:px-6 ygi:py-4">
						<button
							type="button"
							onClick={handleRandomPick}
							disabled={selectedCount === 0}
							className={twJoin(
								"ygi:flex ygi:h-14 ygi:w-full ygi:items-center ygi:justify-center",
								"ygi:rounded-md ygi:heading-18-bd",
								"ygi:transition-colors",
								selectedCount > 0
									? "ygi:cursor-pointer ygi:bg-button-primary ygi:text-text-inverse"
									: "ygi:cursor-not-allowed ygi:bg-button-primary-disabled ygi:text-text-inverse",
							)}
						>
							{selectedCount}곳 중에 랜덤 뽑기
						</button>
					</div>
				</div>
			</footer>
		</Layout.Root>
	);
};
