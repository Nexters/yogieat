"use client";

import { useEffect } from "react";

import type { EventType } from "./types";
import type { EventHandler } from "./schemas";
import { useServerSentEventRegistry } from "./ServerSentEventProvider";

export function useServerSentEventListener<TEvent extends EventType>(
	eventType: TEvent,
	handler: EventHandler<TEvent>,
) {
	const eventRegistry = useServerSentEventRegistry();

	useEffect(() => {
		eventRegistry.on(eventType, handler);

		return () => {
			eventRegistry.off(eventType, handler);
		};
	}, [eventRegistry, eventType, handler]);
}
