import { sendGAEvent } from "@next/third-parties/google";

const MAX_RETRY = 10;
const RETRY_DELAY = 100;

/**
 * GA dataLayer가 준비될 때까지 대기 후 이벤트 전송
 */
const waitForGAAndSend = (
	eventName: string,
	params?: Record<string, string | number | boolean>,
	retryCount = 0,
) => {
	if (typeof window === "undefined") return;

	if (window.dataLayer) {
		sendGAEvent("event", eventName, { ...params });
	} else if (retryCount < MAX_RETRY) {
		setTimeout(() => {
			waitForGAAndSend(eventName, params, retryCount + 1);
		}, RETRY_DELAY);
	}
};

/**
 * GA4 커스텀 이벤트 로깅 유틸리티
 *
 * Debug 모드는 GoogleAnalytics 컴포넌트에서 환경에 따라 자동 설정됨
 * - development: DebugView에서만 확인
 * - production: 실제 보고서에 반영
 */
export const trackEvent = (
	eventName: string,
	params?: Record<string, string | number | boolean>,
) => {
	waitForGAAndSend(eventName, params);
};

/**
 * 페이지 진입 이벤트
 *
 * @example
 * trackPageView("view_onboarding", { page_id: "onboarding" });
 * trackPageView("view_complete", { page_id: "create_complete", group_id: "abc123" });
 */
export const trackPageView = (
	eventName: string,
	params: { page_id: string } & Record<string, string | number | boolean>,
) => {
	trackEvent(eventName, params);
};

/**
 * CTA 버튼 클릭 이벤트
 *
 * @example
 * trackCtaClick({ page_id: "onboarding", button_name: "start_link" });
 */
export const trackCtaClick = (params: {
	page_id: string;
	button_name: string;
}) => {
	trackEvent("cta_click", params);
};

/**
 * 퍼널 단계 완료 이벤트
 *
 * @example
 * trackStepComplete({ page_id: "create_step_1", step_name: "people", step_value: "4명" });
 */
export const trackStepComplete = (params: {
	page_id: string;
	step_name: string;
	step_value: string;
	duration?: number;
}) => {
	trackEvent("step_complete", params);
};
