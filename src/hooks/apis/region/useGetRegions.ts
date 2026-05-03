import { useSuspenseQuery } from "@tanstack/react-query";

import { regionQueryOptions } from "#/apis/region";

export const useGetRegions = () => {
	return useSuspenseQuery({
		...regionQueryOptions.list(),
		select: (response) =>
			new Map(response.data.regions.map((r) => [r.code, r.displayName])),
	});
};
