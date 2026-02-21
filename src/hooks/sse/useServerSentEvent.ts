"use client";

import { useEffect, useRef, useState } from "react";

export interface ServerSentEventOptions {
	url: string;
	enabled?: boolean;
	withCredentials?: boolean;
	onOpen?: () => void;
	onError?: (error: Event) => void;
	onMessage?: (event: MessageEvent) => void;
	events?: Record<string, (event: MessageEvent) => void>;
}

export const useServerSentEvent = ({
	url,
	enabled = true,
	withCredentials = false,
	onOpen,
	onError,
	onMessage,
	events = {},
}: ServerSentEventOptions) => {
	const eventSourceRef = useRef<EventSource | null>(null);

	const [readyState, setReadyState] = useState<number>(0);

	useEffect(() => {
		if (!enabled) return;

		const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
		const fullUrl = `${baseUrl}${url}`;
		const eventSource = new EventSource(fullUrl, { withCredentials });

		eventSourceRef.current = eventSource;

		eventSource.addEventListener("open", () => {
			setReadyState(1);
			onOpen?.();
		});

		eventSource.addEventListener("error", (error) => {
			setReadyState(eventSource.readyState);
			onError?.(error);
		});

		if (onMessage) {
			eventSource.addEventListener("message", onMessage);
		}

		Object.entries(events).forEach(([eventType, handler]) => {
			eventSource.addEventListener(eventType, handler);
		});

		return () => {
			Object.entries(events).forEach(([eventType, handler]) => {
				eventSource.removeEventListener(eventType, handler);
			});

			eventSource.close();
			eventSourceRef.current = null;
			setReadyState(2);
		};
		// NOTE : events, onMessage, onOpen, onError는 의도적으로 의존성에서 제외
		// 재연결이 필요한 경우(url, enabled, withCredentials 변경)에만 재연결
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, enabled, withCredentials]);

	return {
		readyState,
	};
};
