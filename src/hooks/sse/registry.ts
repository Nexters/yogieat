import { EVENT, type EventType } from "./types";
import type { EventPayload, EventHandler } from "./schemas";
import { EVENT_SCHEMA } from "./schemas";
import { isError } from "es-toolkit";

type EventRegistryMap = Map<EventType, Set<EventHandler<EventType>>>;

export class EventRegistry {
	private eventRegistry: EventRegistryMap = new Map();

	public on<TEvent extends EventType>(
		type: TEvent,
		eventHandler: EventHandler<TEvent>,
	) {
		const handlerList = this.getHandler(type);
		handlerList.add(eventHandler);
	}

	public off<TEvent extends EventType>(
		type: TEvent,
		eventHandler: EventHandler<TEvent>,
	) {
		const handlerList = this.getHandler(type);
		handlerList.delete(eventHandler);
	}

	public emit<TEvent extends EventType>(
		type: TEvent,
		payload: EventPayload[TEvent],
	) {
		const payloadSchema = EVENT_SCHEMA[type];
		const { data, success, error } = payloadSchema.safeParse(payload);

		if (!success) {
			console.error(
				new Error(`Invalid payload for ${type}: ${error.message}`),
			);
			return;
		}

		const handlerList = this.getHandler(type);

		handlerList.forEach((eventHandler) => {
			try {
				eventHandler(data);
			} catch (error) {
				const errorMessage = isError(error)
					? error.message
					: String(error);
				console.error(
					`Error in event handler for ${type}:`,
					errorMessage,
				);
			}
		});
	}

	public clear() {
		Object.entries(EVENT).forEach(([, eventType]) =>
			this.eventRegistry.set(eventType, new Set()),
		);
	}

	private getHandler<TEvent extends EventType>(type: TEvent) {
		if (!this.eventRegistry.has(type)) {
			this.eventRegistry.set(type, new Set());
		}

		return this.eventRegistry.get(type) as Set<EventHandler<EventType>>;
	}
}
