"use client";

import { twJoin } from "tailwind-merge";

import { trackShareClick } from "#/components/analytics";
import { share } from "#/utils/share";

interface ShareFooterProps {
	restaurantId: string;
	restaurantName: string;
	pageId: string;
}

export const ShareFooter = ({
	restaurantId,
	restaurantName,
	pageId,
}: ShareFooterProps) => {
	const handleShare = () => {
		trackShareClick({ page_id: pageId, share_location: "Footer" });
		void share({
			title: restaurantName,
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
