import { useSuspenseQuery } from "@tanstack/react-query";

import {
	gatheringQueryOptions,
	type GatheringCapacityResponse,
} from "#/apis/gathering";

export const useGetGatheringCapacity = (accessKey: string) => {
	return useSuspenseQuery({
		...gatheringQueryOptions.capacity(accessKey),
		select: (response: { data: GatheringCapacityResponse }) =>
			response.data,
	});
};
