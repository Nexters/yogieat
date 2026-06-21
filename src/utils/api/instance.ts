import { createApiClient } from "./client";

export const apiClient = createApiClient({
	baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

export const apiClientV2 = createApiClient({
	baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v2`,
});
