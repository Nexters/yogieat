import { z } from "zod";

import { EVENT, type EventType } from "./types";
import {
	recommendResultCreatedSchema,
	participantCountSchema,
} from "#/schemas/sse";

export const EVENT_SCHEMA = {
	[EVENT.RECOMMEND_RESULT_CREATED]: recommendResultCreatedSchema,
	[EVENT.PARTICIPANT_COUNT]: participantCountSchema,
};

export type EventPayload = {
	[K in EventType]: z.infer<(typeof EVENT_SCHEMA)[K]>;
};

export type EventHandler<TEvent extends EventType = EventType> = [
	TEvent,
] extends [infer E extends EventType]
	? (payload: EventPayload[E]) => void
	: never;
