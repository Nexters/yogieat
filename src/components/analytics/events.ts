import { sendGAEvent } from "@next/third-parties/google";

/**
 * GA4 커스텀 이벤트 로깅 유틸리티
 *
 * Debug 모드는 GoogleAnalytics 컴포넌트에서 환경에 따라 자동 설정됨
 * - development: DebugView에서만 확인
 * - production: 실제 보고서에 반영
 *
 * @example
 * // 버튼 클릭 이벤트
 * trackEvent("click", { target: "create_gathering_button", page: "landing" });
 *
 * // 페이지 특정 액션
 * trackEvent("gathering_created", { gathering_id: "123" });
 */
export const trackEvent = (
	eventName: string,
	params?: Record<string, string | number | boolean>,
) => {
	sendGAEvent("event", eventName, { ...params });
};

/**
 * 버튼 클릭 이벤트 로깅
 */
export const trackButtonClick = (
	buttonName: string,
	additionalParams?: Record<string, string | number | boolean>,
) => {
	trackEvent("button_click", {
		button_name: buttonName,
		...additionalParams,
	});
};
