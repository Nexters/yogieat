"use client";

import { twJoin } from "tailwind-merge";

import { trackCtaClick, trackShareClick } from "#/components/analytics";
import { share } from "#/utils/share";

const baseButtonClass = twJoin(
	"ygi:flex ygi:h-14 ygi:items-center ygi:justify-center",
	"ygi:rounded-md ygi:heading-18-bd",
	"ygi:cursor-pointer",
);

// 시안 매핑: 두 버튼 케이스에서 공유하기는 tertiary, 전화하기는 primary 메인 CTA.
// 단독 케이스(phoneNumber null)에서는 공유하기가 유일 액션이라 primary 로 회귀.
const primaryVariantClass = "ygi:bg-button-primary ygi:text-text-inverse";
const tertiaryVariantClass = "ygi:bg-palette-gray-200 ygi:text-button-primary";

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
	const hasPhone = phoneNumber !== null && phoneNumber.trim() !== "";

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

	const handleCallClick = () => {
		trackCtaClick({
			page_id: pageId,
			button_name: "전화하기",
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
					{hasPhone ? (
						<div className="ygi:flex ygi:gap-2">
							<button
								type="button"
								onClick={handleShare}
								className={twJoin(
									baseButtonClass,
									tertiaryVariantClass,
									"ygi:flex-1",
								)}
							>
								공유하기
							</button>
							<a
								href={`tel:${phoneNumber}`}
								onClick={handleCallClick}
								className={twJoin(
									baseButtonClass,
									primaryVariantClass,
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
							className={twJoin(
								baseButtonClass,
								primaryVariantClass,
								"ygi:w-full",
							)}
						>
							공유하기
						</button>
					)}
				</div>
			</div>
		</footer>
	);
};
