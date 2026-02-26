import { z } from "zod";

import { EVENT, type EventType } from "./types";
import { gatheringFullSchema, participantCountSchema } from "#/schemas/sse";

export const EVENT_SCHEMA = {
	[EVENT.GATHERING_FULL]: gatheringFullSchema,
	[EVENT.PARTICIPANT_COUNT]: participantCountSchema,
} as const;

export type EventPayload = {
	[K in EventType]: z.infer<(typeof EVENT_SCHEMA)[K]>;
};

export type EventHandler<
	TEvent extends EventType = EventType,
	TPayload = EventPayload[TEvent],
> = (payload: TPayload) => void;
