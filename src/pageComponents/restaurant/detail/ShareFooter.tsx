"use client";

import { twJoin } from "tailwind-merge";

import { trackShareClick } from "#/components/analytics";
import { share } from "#/utils/share";

interface ShareFooterProps {
	restaurantId: string;
	restaurantName: string;
	restaurantAddress: string;
	pageId: string;
}

export const ShareFooter = ({
	restaurantId,
	restaurantName,
	restaurantAddress,
	pageId,
}: ShareFooterProps) => {
	const handleShare = () => {
		trackShareClick({
			page_id: pageId,
			share_location: "식당 상세 하단 공유 버튼",
		});
		share({
			title: "[요기잇]",
			text: `\n${restaurantName}\n${restaurantAddress}`,
			url: `${window.location.origin}/restaurants/${restaurantId}`,
		});
	};

	return (
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
						onClick={handleShare}
						className={twJoin(
							"ygi:flex ygi:h-14 ygi:w-full ygi:items-center ygi:justify-center",
							"ygi:rounded-md ygi:bg-button-primary",
							"ygi:heading-18-bd ygi:text-text-inverse",
							"ygi:cursor-pointer",
						)}
					>
						공유하기
					</button>
				</div>
			</div>
		</footer>
	);
};
