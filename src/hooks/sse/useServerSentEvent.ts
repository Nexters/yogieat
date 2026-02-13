"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ServerSentEventOptions {
	url: string;
	enabled?: boolean;
	withCredentials?: boolean;
	onOpen?: () => void;
	onError?: (error: Event) => void;
	onMessage?: (event: MessageEvent) => void;
	events?: Record<string, (data: unknown) => void>;
}

export interface ServerSentEventReturn {
	readyState: number;
	close: () => void;
	reconnect: () => void;
}

export const useServerSentEvent = (
	options: ServerSentEventOptions,
): ServerSentEventReturn => {
	const {
		url,
		enabled = true,
		withCredentials = false,
		onOpen,
		onError,
		onMessage,
		events = {},
	} = options;

	const eventSourceRef = useRef<EventSource | null>(null);
	const [readyState, setReadyState] = useState<number>(
		EventSource.CONNECTING,
	);
	const [reconnectTrigger, setReconnectTrigger] = useState(0);

	const close = useCallback(() => {
		if (eventSourceRef.current) {
			eventSourceRef.current.close();
			eventSourceRef.current = null;
			setReadyState(EventSource.CLOSED);
		}
	}, []);

	const reconnect = useCallback(() => {
		close();
		setReconnectTrigger((prev) => prev + 1);
	}, [close]);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const eventSource = new EventSource(url, { withCredentials });
		eventSourceRef.current = eventSource;

		eventSource.addEventListener("open", () => {
			setReadyState(EventSource.OPEN);
			onOpen?.();
		});

		eventSource.addEventListener("error", (error) => {
			setReadyState(EventSource.CLOSED);
			onError?.(error);
		});

		if (onMessage) {
			eventSource.addEventListener("message", onMessage);
		}

		Object.entries(events).forEach(([eventType, handler]) => {
			eventSource.addEventListener(eventType, (e: MessageEvent) => {
				try {
					const data = JSON.parse(e.data);
					handler(data);
				} catch (error) {
					console.error(`Failed to parse SSE event: ${eventType}`, error);
				}
			});
		});

		return () => {
			eventSource.close();
			eventSourceRef.current = null;
		};
	}, [
		url,
		enabled,
		withCredentials,
		onOpen,
		onError,
		onMessage,
		events,
		reconnectTrigger,
	]);

	return {
		readyState,
		close,
		reconnect,
	};
};
