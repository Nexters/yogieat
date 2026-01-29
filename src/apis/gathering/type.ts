/**
 * 모임 API 요청/응답 타입
 */

import type { Region, TimeSlot } from "#/types/gathering";

/** 모임 생성 요청 */
export interface CreateGatheringRequest {
	/** 모임 인원수 (1-10) */
	peopleCount: number;
	/** 지역 */
	region: Region;
	/** 모임 날짜 (YYYY-MM-DD) */
	scheduledDate: string;
	/** 시간대 */
	timeSlot: TimeSlot;
}

/** 모임 생성 응답 */
export interface CreateGatheringResponse {
	/** 모임 접근키 */
	accessKey: string;
}

/** 모임 참여자 현황 조회 응답 */
export interface GatheringCapacityResponse {
	/** 현재 참여 인원 */
	currentCount: number;
	/** 최대 참여 인원 */
	maxCount: number;
}
