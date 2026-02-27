/**
 * 참여 API 요청/응답 타입
 */

/** 모임 참여 요청 */
export interface CreateParticipantRequest {
	/** 모임 접근키 */
	accessKey: string;
	/** 거리 (km) */
	distance: number | null;
	/** 싫어하는 음식 목록 */
	dislikes: string[];
	/** 선호하는 음식 목록 */
	preferences: string[];
	/** 이름 */
	nickname: string;
}

/** 모임 참여 응답 */
export interface CreateParticipantResponse {
	/** 모임 접근키 */
	accessKey: string;
	/** 참여자 ID */
	participantId: number;
	/** 모임 ID */
	gatheringId: number;
}

/** 닉네임 사전 검증 요청 */
export interface ValidateNicknameRequest {
	/** 모임 접근키 */
	accessKey: string;
	/** 확인할 닉네임 */
	nickname: string;
}
