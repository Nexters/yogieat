import { createApiClient } from "./client";

/**
 * 기본 API 클라이언트 인스턴스
 * 환경 변수 NEXT_PUBLIC_API_URL을 기본 URL로 사용
 */
export const apiClient = createApiClient({
	baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});
