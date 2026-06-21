"use client";

import { useParams, useRouter } from "next/navigation";
import { twJoin } from "tailwind-merge";

import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { Toaster } from "#/components/toast";
import { useGetRestaurantDetail } from "#/hooks/apis/restaurant";
import { AiSummarySection } from "#/pageComponents/restaurant/detail/AiSummarySection";
import { HeroImageSection } from "#/pageComponents/restaurant/detail/HeroImageSection";
import { OverviewSection } from "#/pageComponents/restaurant/detail/OverviewSection";
import { PriceLevelSection } from "#/pageComponents/restaurant/detail/PriceLevelSection";
import { RepresentMenuSection } from "#/pageComponents/restaurant/detail/RepresentMenuSection";
import { ReviewSection } from "#/pageComponents/restaurant/detail/ReviewSection";
import { share } from "#/utils/share";

const FOOTER_OFFSET = 88;

export const RandomPickResultPage = () => {
	const { accessKey, restaurantId } = useParams<{
		accessKey: string;
		restaurantId: string;
	}>();
	const router = useRouter();
	const { data: restaurant } = useGetRestaurantDetail(restaurantId);

	const handleBack = () => {
		router.push(`/gathering/${accessKey}/opinion/result/random-pick`);
	};

	const handleRetry = () => {
		router.push(`/gathering/${accessKey}/opinion/result/random-pick`);
	};

	const handleShare = async () => {
		await share({
			title: "[요기잇]",
			text: `${restaurant.restaurantName}\n${restaurant.address}`,
			url: `${window.location.origin}/restaurants/${restaurantId}`,
		});
	};

	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton onClick={handleBack} />
			</Layout.Header>

			<Layout.Content background="gray">
				<div className="ygi:flex ygi:flex-col">
					<div className="ygi:bg-surface-white ygi:px-6 ygi:pt-3 ygi:pb-4">
						<h1 className="ygi:heading-22-bd ygi:text-text-primary">
							이번에는 여기 어때요?
						</h1>
					</div>

					<div className="ygi:flex ygi:flex-col ygi:gap-2">
						<div className="ygi:overflow-clip ygi:rounded-none ygi:bg-surface-white">
							<div className="ygi:px-5 ygi:pt-5">
								<div className="ygi:overflow-clip ygi:rounded-md">
									<HeroImageSection restaurant={restaurant} />
								</div>
							</div>
							<div className="ygi:flex ygi:flex-col ygi:divide-y ygi:divide-dashed ygi:divide-border-default">
								<OverviewSection restaurant={restaurant} />
								<AiSummarySection restaurant={restaurant} />
							</div>
						</div>

						<div className="ygi:flex ygi:flex-col ygi:divide-y ygi:divide-dashed ygi:divide-border-default ygi:bg-surface-white">
							<PriceLevelSection restaurant={restaurant} />
							<RepresentMenuSection restaurant={restaurant} />
						</div>

						<ReviewSection restaurant={restaurant} />
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
					<div className="ygi:flex ygi:gap-3 ygi:px-6 ygi:py-4">
						<button
							type="button"
							onClick={handleRetry}
							className={twJoin(
								"ygi:flex ygi:h-14 ygi:flex-1 ygi:items-center ygi:justify-center",
								"ygi:rounded-md ygi:heading-18-bd",
								"ygi:cursor-pointer ygi:bg-button-tertiary ygi:text-text-secondary",
								"ygi:hover:bg-button-tertiary-hover",
							)}
						>
							다시 뽑기
						</button>
						<button
							type="button"
							onClick={handleShare}
							className={twJoin(
								"ygi:flex ygi:h-14 ygi:flex-1 ygi:items-center ygi:justify-center",
								"ygi:rounded-md ygi:heading-18-bd",
								"ygi:cursor-pointer ygi:bg-button-primary ygi:text-text-inverse",
								"ygi:hover:bg-button-primary-hover",
							)}
						>
							공유하기
						</button>
					</div>
				</div>
			</footer>

			<Toaster
				offset={{ bottom: FOOTER_OFFSET }}
				mobileOffset={{ bottom: FOOTER_OFFSET }}
			/>
		</Layout.Root>
	);
};
