/**
 * 모임 API 요청/응답 타입
 */

import type { TimeSlot } from "#/types/gathering";
import { Region } from "#/constants/gathering/opinion";

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

/** 모임 단건 조회 응답 */
export interface GetGatheringResponse {
	/** 모임 ID */
	id: number;
	/** 모임 접근키 */
	accessKey: string;
	/** 모임 제목 */
	title: string;
	/** 모임 날짜 (YYYY-MM-DD) */
	scheduledDate: string;
	/** 시간대 */
	timeSlot: NonNullable<TimeSlot>;
	/** 지역 */
	region: NonNullable<Region>;
	/** 모임 인원수 */
	peopleCount: number;
}
