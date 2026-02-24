"use client";

import {
	isServer,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { isUndefined } from "es-toolkit";
import { type ReactNode } from "react";

interface QueryProviderProps {
	children: ReactNode;
}

let browserQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// NOTE : SSR 을 사용한다면 클라이언트에서 중복 Refetch 를 방지하기 위해 staleTime 설정 필요
				staleTime: 60 * 1_000,
				retry: 0,
			},
			mutations: {
				retry: 0,
			},
		},
	});
};

const getQueryClient = () => {
	if (isServer) {
		return makeQueryClient();
	}

	if (isUndefined(browserQueryClient)) {
		browserQueryClient = makeQueryClient();
	}

	return browserQueryClient;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};
