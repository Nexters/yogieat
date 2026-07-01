import { sendGAEvent } from "@next/third-parties/google";

const MAX_RETRY = 10;
const RETRY_DELAY = 100;

type AnalyticsParamValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsParamValue>;

const compactParams = (
	params: Record<string, AnalyticsParamValue | undefined>,
): AnalyticsParams =>
	Object.fromEntries(
		Object.entries(params).filter(([, value]) => value !== undefined),
	) as AnalyticsParams;

/**
 * GA dataLayer가 준비될 때까지 대기 후 이벤트 전송
 */
const waitForGAAndSend = (
	eventName: string,
	params?: AnalyticsParams,
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
export const trackEvent = (eventName: string, params?: AnalyticsParams) => {
	waitForGAAndSend(eventName, params);
};

/**
 * 페이지 진입 이벤트
 *
 * @example
 * trackViewPage({ page_id: "onboarding" });
 * trackViewPage({ page_id: "create_complete", group_id: "abc123" });
 */
export const trackViewPage = (
	params: { page_id: string } & Record<string, string | number | boolean>,
) => {
	trackEvent("view_page", params);
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

/**
 * 공유 버튼 클릭 이벤트
 *
 * @example
 * trackShareClick({ page_id: "의견수합_대기", share_location: "waiting_page" });
 */
export const trackShareClick = (params: {
	page_id: string;
	share_location: string;
}) => {
	trackEvent("click_share", params);
};

/**
 * 맛집 클릭 이벤트
 *
 * @example
 * trackRestaurantClick({
 *   page_id: "추천_결과",
 *   restaurant_id: 444,
 *   restaurant_name: "마루심 강남점",
 *   rank_type: "top",
 * });
 */
export const trackRestaurantClick = (params: {
	page_id: string;
	restaurant_id: number;
	restaurant_name: string;
	rank_type: "top" | "other";
}) => {
	trackEvent("click_restaurant", params);
};

export const trackMeetingCreateStartClick = () => {
	trackEvent("모임생성시작_클릭");
};

export const trackGatheringModeSelectClick = (params: {
	flow_type: "alone" | "together";
}) => {
	trackEvent("모임생성방식선택_클릭", params);
};

export const trackAloneRegionSelectClick = (params: {
	region_name: string;
}) => {
	trackEvent("한명_지역선택_클릭", params);
};

export const trackTogetherRegionSelectClick = (params: {
	region_name: string;
}) => {
	trackEvent("여러명_지역선택_클릭", params);
};

export const trackAlonePreferenceCategoryCompleteClick = (params: {
	preferred_categories: string;
}) => {
	trackEvent("일인_선호음식카테고리선택완료_클릭", params);
};

export const trackMemberPreferenceCategoryCompleteClick = (params: {
	group_id: string;
	preferred_categories: string;
}) => {
	trackEvent("모임원_선호음식카테고리선택완료_클릭", params);
};

export const trackMemberDislikeCategoryCompleteClick = (params: {
	group_id: string;
	disliked_categories: string;
}) => {
	trackEvent("모임원_비선호음식카테고리선택완료_클릭", params);
};

export const trackPeopleCountSelectClick = (params: {
	people_count: number;
}) => {
	trackEvent("n인_모임인원선택_클릭", params);
};

export const trackScheduleSelectClick = (params: {
	scheduled_date: string;
	time_slot: string;
}) => {
	trackEvent("n인_모임일정선택_클릭", params);
};

export const trackUpcomingRegionClick = (params: { region_name: string }) => {
	trackEvent("오픈예정지역_클릭", params);
};

export const trackHostOpinionStartClick = () => {
	trackEvent("모임장_의견수합시작_클릭");
};

export const trackMeetingCreateRestartClick = () => {
	trackEvent("모임생성_재시작_클릭");
};

export const trackMemberLandingClick = (params: { group_id: string }) => {
	trackEvent("모임원랜딩_클릭", params);
};

export const trackResultViewClick = (params: {
	group_id: string;
	submit_progress: number;
}) => {
	trackEvent("추천결과보기_클릭", params);
};

export const trackShareButtonClick = (params: {
	group_id?: string;
	share_location: string;
	restaurant_name?: string;
}) => {
	trackEvent("공유하기_클릭", compactParams(params));
};

export const trackRecommendedRestaurantClick = (params: {
	restaurant_name: string;
}) => {
	trackEvent("추천맛집_클릭", params);
};

export const trackPhoneClick = (params: { restaurant_name: string }) => {
	trackEvent("전화하기_클릭", params);
};

export const trackRandomPickClick = (params: {
	selection_modified: boolean;
}) => {
	trackEvent("랜덤뽑기_클릭", params);
};

export const trackRandomPickRetryClick = (params: {
	restaurant_name: string;
}) => {
	trackEvent("다시뽑기_클릭", params);
};
