import { useSuspenseQuery } from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";

export const useGetGatheringCapacity = (accessKey: string) => {
	return useSuspenseQuery({
		...gatheringQueryOptions.capacity(accessKey),
		select: (response) => response.data,
	});
};
