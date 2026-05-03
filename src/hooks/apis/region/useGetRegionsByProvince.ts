import { useSuspenseQuery } from "@tanstack/react-query";

import { regionQueryOptions } from "#/apis/region";
import type { RegionInfo } from "#/apis/region";

export const useGetRegionsByProvince = () => {
	return useSuspenseQuery({
		...regionQueryOptions.list(),
		select: (response) => {
			const grouped = Map.groupBy(
				response.data.regions,
				(region) => region.province,
			);

			const sorted = new Map<string, RegionInfo[]>();
			for (const [province, regions] of grouped) {
				sorted.set(
					province,
					[...regions].sort((a, b) =>
						a.displayName.localeCompare(b.displayName, "ko"),
					),
				);
			}

			return sorted;
		},
	});
};
