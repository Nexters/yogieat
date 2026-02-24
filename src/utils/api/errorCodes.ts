/**
 * 서버 API 에러 코드 타입 정의
 * @see https://github.com/Nexters/yogieat-server/blob/develop/apps/domain/src/main/java/com/yogieat/common/error/ErrorCode.java
 */

/** Common 에러 코드 */
type CommonErrorCode = "C001" | "C002" | "C003";

/** User 에러 코드 */
type UserErrorCode = "U001";

/** Gemini API 에러 코드 */
type GeminiErrorCode = "G001" | "G002";

/** Kakao API 에러 코드 */
type KakaoErrorCode = "K001" | "K002";

/** Restaurant 에러 코드 */
type RestaurantErrorCode =
	| "R001"
	| "R002"
	| "R003"
	| "R004"
	| "R005"
	| "R006"
	| "R007"
	| "R008";

/** Gathering 에러 코드 */
type GatheringErrorCode =
	| "GA001"
	| "GA002"
	| "GA003"
	| "GA004"
	| "GA005"
	| "GA006"
	| "GA007";

/** Participant 에러 코드 */
type ParticipantErrorCode =
	| "P001"
	| "P002"
	| "P003"
	| "P004"
	| "P005"
	| "P006"
	| "P007";

/** Lock 에러 코드 */
type LockErrorCode = "L001";

/** Recommend 에러 코드 */
type RecommendErrorCode = "REC001" | "REC002" | "REC003";

/**
 * 서버에서 반환하는 모든 에러 코드 타입
 */
export type ErrorCode =
	| CommonErrorCode
	| UserErrorCode
	| GeminiErrorCode
	| KakaoErrorCode
	| RestaurantErrorCode
	| GatheringErrorCode
	| ParticipantErrorCode
	| LockErrorCode
	| RecommendErrorCode;

/**
 * 에러 코드 상수 객체
 * IDE 자동완성 및 명시적 사용을 위한 상수
 */
export const ERROR_CODES = {
	// Common
	METHOD_ARGUMENT_TYPE_MISMATCH: "C001",
	METHOD_NOT_ALLOWED: "C002",
	INTERNAL_SERVER_ERROR: "C003",

	// User
	USER_NOT_FOUND: "U001",

	// Gemini API
	GEMINI_API_ERROR: "G001",
	GEMINI_RESPONSE_PARSE_ERROR: "G002",

	// Kakao API
	KAKAO_API_ERROR: "K001",
	KAKAO_RATE_LIMIT_EXCEEDED: "K002",

	// Restaurant
	RESTAURANT_COLLECTION_FAILED: "R001",
	INVALID_LOCATION_NAME: "R002",
	INVALID_CATEGORY_NAME: "R003",
	RESTAURANT_NOT_FOUND: "R004",
	CATEGORY_NOT_FOUND: "R005",
	SYNC_JOB_NOT_FOUND: "R006",
	SYNC_JOB_CONFLICT: "R007",
	RESTAURANT_SYNC_FAILED: "R008",

	// Gathering
	GATHERING_NOT_FOUND: "GA001",
	GATHERING_DELETED: "GA002",
	GATHERING_FULL: "GA003",
	GATHERING_PEOPLE_COUNT_REQUIRED: "GA004",
	GATHERING_PEOPLE_COUNT_OUT_OF_RANGE: "GA005",
	GATHERING_SCHEDULED_DATE_REQUIRED: "GA006",
	GATHERING_SCHEDULED_DATE_PAST: "GA007",

	// Participant
	PARTICIPANT_DISLIKES_EXCEEDED: "P001",
	PARTICIPANT_PREFERENCES_EXCEEDED: "P002",
	PARTICIPANT_NICKNAME_REQUIRED: "P003",
	PARTICIPANT_NICKNAME_TOO_LONG: "P004",
	PARTICIPANT_NICKNAME_INVALID: "P005",
	DUPLICATE_NICKNAME: "P006",
	PARTICIPANT_MAJORITY_NOT_REACHED: "P007",

	// Lock
	LOCK_TIMEOUT: "L001",

	// Recommend
	INVALID_CATEGORY_AGGREGATION: "REC001",
	INVALID_PREFERENCE_SCORE: "REC002",
	RECOMMEND_ALREADY_PROCEEDED: "REC003",
} as const satisfies Record<string, ErrorCode>;
