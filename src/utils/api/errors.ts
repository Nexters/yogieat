import type { ErrorData, ErrorResponse } from "./types";

/**
 * API 에러 클래스
 * 서버에서 반환된 에러 응답을 담는 커스텀 에러
 */
export class ApiError extends Error {
	/** HTTP 상태 코드 */
	readonly status: number;
	/** 에러 코드 (ex. "U001") */
	readonly errorCode: string;
	/** 에러 발생 시각 */
	readonly timestamp: string;

	constructor(response: ErrorResponse) {
		super(response.data.message);
		this.name = "ApiError";
		this.status = response.status;
		this.errorCode = response.data.errorCode;
		this.timestamp = response.timestamp;
	}

	/**
	 * 에러 데이터 객체 반환
	 */
	toErrorData(): ErrorData {
		return {
			errorCode: this.errorCode,
			message: this.message,
		};
	}
}

/**
 * ApiError 타입 가드
 */
export const isApiError = (error: unknown): error is ApiError => {
	return error instanceof ApiError;
};
