"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
	children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						retry: 1,
					},
					mutations: {
						retry: 0,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};
