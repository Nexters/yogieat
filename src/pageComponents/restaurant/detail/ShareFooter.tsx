"use client";

import { twJoin } from "tailwind-merge";

import { trackShareClick } from "#/components/analytics";
import { toast } from "#/utils/toast";

interface ShareFooterProps {
	restaurantId: string;
	pageId: string;
}

export const ShareFooter = ({ restaurantId, pageId }: ShareFooterProps) => {
	const handleShare = async () => {
		trackShareClick({ page_id: pageId, share_location: "Footer" });

		const url = `${window.location.origin}/restaurants/${restaurantId}`;

		if (typeof navigator === "undefined" || !navigator.clipboard) {
			toast.warning("공유 기능을 사용할 수 없습니다");
			return;
		}

		try {
			await navigator.clipboard.writeText(url);
			toast.success("링크가 복사되었어요");
		} catch {
			toast.warning("링크 복사에 실패했습니다");
		}
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
