"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { twJoin } from "tailwind-merge";

import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { CATEGORY_LABEL } from "#/constants/gathering/opinion";
import { useGetRecommendResult } from "#/hooks/apis/recommendResult";
import type { Restaurant } from "#/types/gathering";

import { RandomPickDrumrollPage } from "./RandomPickDrumrollPage";

const CheckIndicator = ({ checked }: { checked: boolean }) => (
	<div
		className={twJoin(
			"ygi:flex ygi:h-6 ygi:w-6 ygi:shrink-0 ygi:items-center ygi:justify-center",
			"ygi:rounded-sm ygi:transition-colors",
			checked
				? "ygi:bg-surface-active ygi:stroke-icon-inverse"
				: "ygi:border ygi:border-border-default ygi:bg-surface-white ygi:stroke-border-default",
		)}
	>
		<svg
			width="14"
			height="10"
			viewBox="0 0 14 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 5L5 9L13 1"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	</div>
);

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
		<button
			type="button"
			role="checkbox"
			aria-checked={checked}
			onClick={() => onCheckedChange(!checked)}
			className={twJoin(
				"ygi:flex ygi:w-full ygi:items-center ygi:gap-3",
				"ygi:border-b ygi:border-border-default ygi:last:border-none",
				"ygi:bg-surface-white ygi:px-6 ygi:py-5 ygi:text-left ygi:cursor-pointer",
			)}
		>
			<CheckIndicator checked={checked} />
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
		</button>
	);
};

export const RandomPickSelectPage = () => {
	const { accessKey } = useParams<{ accessKey: string }>();
	const router = useRouter();
	const { data: result } = useGetRecommendResult(accessKey);

	const restaurants = useMemo(
		() => [result.topRecommendation, ...result.otherCandidates],
		[result],
	);

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
								checked={selectedIds.has(restaurant.restaurantId)}
								onCheckedChange={(checked) =>
									handleToggle(restaurant.restaurantId, checked)
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
					<div className="ygi:px-6 ygi:pt-4">
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
