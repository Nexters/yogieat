import { useQuery } from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";

interface UseGetGatheringCapacityProps {
	accessKey: string;
	enabled?: boolean;
}

export const useGetGatheringCapacity = ({
	accessKey,
	enabled = true,
}: UseGetGatheringCapacityProps) => {
	return useQuery({
		...gatheringQueryOptions.capacity(accessKey),
		select: (response) => response.data,
		throwOnError: true,
		enabled,
	});
};
