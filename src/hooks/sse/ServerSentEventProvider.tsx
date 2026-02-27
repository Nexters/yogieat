"use client";

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	type PropsWithChildren,
} from "react";

import { EventRegistry } from "./registry";
import { EVENT } from "./types";

interface ServerSentEventProviderProps {
	url: string;
	withCredentials?: boolean;
	enabled?: boolean;
}

const ServerSentEventContext = createContext<EventRegistry | null>(null);

const BASE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`;
const isDevelopment = process.env.NODE_ENV === "development";

export function ServerSentEventProvider({
	url,
	withCredentials,
	enabled = true,
	children,
}: PropsWithChildren<ServerSentEventProviderProps>) {
	const eventSourceRef = useRef<EventSource | null>(null);
	const eventRegistry = useMemo(() => new EventRegistry(), []);

	const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
	const connectionUrl = new URL(cleanUrl, BASE_API_URL).toString();

	useEffect(() => {
		if (!enabled) return;

		const eventSource = new EventSource(connectionUrl, {
			withCredentials,
		});

		eventSourceRef.current = eventSource;

		eventSource.onopen = () => {
			if (isDevelopment) {
				console.debug(`[SSE] Connected: ${connectionUrl}`);
			}
		};

		eventSource.onerror = () => {
			if (isDevelopment) {
				console.debug(`[SSE] Connection error: ${connectionUrl}`);
			}
		};

		Object.values(EVENT).forEach((eventType) => {
			eventSource.addEventListener(eventType, (event: MessageEvent) => {
				try {
					const payload = JSON.parse(event.data);
					eventRegistry.emit(eventType, payload);
				} catch (error) {
					console.error(
						`[SSE] Failed to parse event data for ${eventType}:`,
						error,
					);
				}
			});
		});

		return () => {
			eventSource.close();
			eventRegistry.clear();
			eventSourceRef.current = null;
		};
	}, [connectionUrl, withCredentials, enabled, eventRegistry]);

	return (
		<ServerSentEventContext.Provider value={eventRegistry}>
			{children}
		</ServerSentEventContext.Provider>
	);
}

export function useServerSentEventRegistry(): EventRegistry {
	const registry = useContext(ServerSentEventContext);

	if (!registry) {
		throw new Error(
			"useServerSentEventRegistry must be used within ServerSentEventProvider",
		);
	}

	return registry;
}
