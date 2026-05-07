"use client";

import { twJoin } from "tailwind-merge";

import { trackCtaClick, trackShareClick } from "#/components/analytics";
import { share } from "#/utils/share";

interface ShareFooterProps {
	restaurantId: string;
	restaurantName: string;
	restaurantAddress: string;
	phoneNumber: string | null;
	pageId: string;
}

export const ShareFooter = ({
	restaurantId,
	restaurantName,
	restaurantAddress,
	phoneNumber,
	pageId,
}: ShareFooterProps) => {
	const handleShare = () => {
		trackShareClick({
			page_id: pageId,
			share_location: "식당 상세 하단 공유 버튼",
		});
		share({
			title: "[요기잇]",
			text: `${restaurantName}\n${restaurantAddress}`,
			url: `${window.location.origin}/restaurants/${restaurantId}`,
		});
	};

	const hasPhone = phoneNumber !== null && phoneNumber.trim() !== "";

	const shareButtonClass = twJoin(
		"ygi:flex ygi:h-14 ygi:items-center ygi:justify-center",
		"ygi:rounded-md ygi:bg-button-primary",
		"ygi:heading-18-bd ygi:text-text-inverse",
		"ygi:cursor-pointer",
	);

	const phoneButtonClass = twJoin(
		"ygi:flex ygi:h-14 ygi:items-center ygi:justify-center",
		"ygi:rounded-md ygi:bg-surface-white",
		"ygi:border ygi:border-border-default",
		"ygi:heading-18-bd ygi:text-text-primary",
		"ygi:cursor-pointer",
	);

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
					{hasPhone ? (
						<div className="ygi:flex ygi:gap-2">
							<button
								type="button"
								onClick={handleShare}
								className={twJoin(
									shareButtonClass,
									"ygi:flex-1",
								)}
							>
								공유하기
							</button>
							<a
								href={`tel:${phoneNumber}`}
								onClick={() =>
									trackCtaClick({
										page_id: pageId,
										button_name: "전화하기",
									})
								}
								className={twJoin(
									phoneButtonClass,
									"ygi:flex-1",
								)}
							>
								전화하기
							</a>
						</div>
					) : (
						<button
							type="button"
							onClick={handleShare}
							className={twJoin(shareButtonClass, "ygi:w-full")}
						>
							공유하기
						</button>
					)}
				</div>
			</div>
		</footer>
	);
};
