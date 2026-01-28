import ky, { type Options as KyOptions } from "ky";

import { ApiError } from "./errors";
import type { ApiRequestOptions, ApiResponse, ErrorResponse } from "./types";

/**
 * API 클라이언트 설정
 */
interface ApiClientConfig {
	/** 기본 URL */
	baseUrl: KyOptions["prefixUrl"];
	/** 기본 타임아웃 (ms) */
	timeout?: KyOptions["timeout"];
	/** 기본 헤더 */
	headers?: KyOptions["headers"];
}

/**
 * API 클라이언트 생성 함수
 * Server Component, Client Component 모두에서 사용 가능
 */
export const createApiClient = (config: ApiClientConfig) => {
	const instance = ky.create({
		prefixUrl: config.baseUrl,
		timeout: config.timeout ?? 30000,
		headers: {
			"Content-Type": "application/json",
			...config.headers,
		},
		hooks: {
			afterResponse: [
				async (_request, _options, response) => {
					if (!response.ok) {
						const errorResponse =
							(await response.json()) as ErrorResponse;
						throw new ApiError(errorResponse);
					}
					return response;
				},
			],
		},
	});

	/**
	 * 공통 요청 옵션 변환
	 */
	const buildKyOptions = (options?: ApiRequestOptions): KyOptions => ({
		headers: options?.headers,
		searchParams: options?.searchParams,
		timeout: options?.timeout,
	});

	return {
		/**
		 * GET 요청
		 */
		get: async <T>(
			url: string,
			options?: ApiRequestOptions,
		): Promise<ApiResponse<T>> => {
			const response = await instance.get(url, buildKyOptions(options));
			return response.json<ApiResponse<T>>();
		},

		/**
		 * POST 요청
		 */
		post: async <T, B = unknown>(
			url: string,
			body?: B,
			options?: ApiRequestOptions,
		): Promise<ApiResponse<T>> => {
			const response = await instance.post(url, {
				...buildKyOptions(options),
				json: body,
			});
			return response.json<ApiResponse<T>>();
		},

		/**
		 * PUT 요청
		 */
		put: async <T, B = unknown>(
			url: string,
			body?: B,
			options?: ApiRequestOptions,
		): Promise<ApiResponse<T>> => {
			const response = await instance.put(url, {
				...buildKyOptions(options),
				json: body,
			});
			return response.json<ApiResponse<T>>();
		},

		/**
		 * PATCH 요청
		 */
		patch: async <T, B = unknown>(
			url: string,
			body?: B,
			options?: ApiRequestOptions,
		): Promise<ApiResponse<T>> => {
			const response = await instance.patch(url, {
				...buildKyOptions(options),
				json: body,
			});
			return response.json<ApiResponse<T>>();
		},

		/**
		 * DELETE 요청
		 */
		delete: async <T>(
			url: string,
			options?: ApiRequestOptions,
		): Promise<ApiResponse<T>> => {
			const response = await instance.delete(
				url,
				buildKyOptions(options),
			);
			return response.json<ApiResponse<T>>();
		},
	};
};

/**
 * API 클라이언트 타입
 */
export type ApiClient = ReturnType<typeof createApiClient>;
