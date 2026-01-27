"use client";

import { toast } from "./toast";

export interface ShareData {
	title: string;
	text?: string;
	url: string;
}

interface ShareResult {
	success: boolean;
	method: "webShare" | "clipboard" | "failed";
}

const MOBILE_BREAKPOINT = 768;

/**
 * 모바일 기기인지 확인합니다.
 * 화면 너비가 768px 미만이면 모바일로 판단합니다.
 */
function isMobileDevice(): boolean {
	if (typeof window === "undefined") {
		return false;
	}

	return window.innerWidth < MOBILE_BREAKPOINT;
}

/**
 * 공유 기능을 수행합니다.
 * - 모바일 기기에서 Web Share API를 지원하는 경우 네이티브 공유 시트를 사용합니다.
 * - 데스크톱이거나 Web Share API를 지원하지 않는 환경에서는 클립보드에 URL을 복사하고 toast로 알립니다.
 */
export async function share(data: ShareData): Promise<ShareResult> {
	// 모바일에서만 Web Share API 사용 (데스크톱은 popover UX가 좋지 않음)
	const canUseWebShare =
		isMobileDevice() && typeof navigator !== "undefined" && navigator.share;

	if (canUseWebShare) {
		try {
			const text = [data.title, data.text, data.url]
				.filter(Boolean)
				.join("\n");
			await navigator.share({ text });
			return { success: true, method: "webShare" };
		} catch (error) {
			// 사용자가 공유를 취소한 경우 (AbortError)
			if (error instanceof Error && error.name === "AbortError") {
				return { success: false, method: "webShare" };
			}
			// 다른 오류 발생 시 클립보드 복사로 fallback
		}
	}

	// Clipboard API fallback
	if (typeof navigator !== "undefined" && navigator.clipboard) {
		try {
			const text = [data.title, data.text, data.url]
				.filter(Boolean)
				.join("\n");
			await navigator.clipboard.writeText(text);
			toast.success("링크가 복사되었습니다");
			return { success: true, method: "clipboard" };
		} catch {
			toast.warning("링크 복사에 실패했습니다");
			return { success: false, method: "failed" };
		}
	}

	// 클립보드 API도 지원하지 않는 경우
	toast.warning("공유 기능을 사용할 수 없습니다");
	return { success: false, method: "failed" };
}
