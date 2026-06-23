import { useSuspenseQuery } from "@tanstack/react-query";

import { regionQueryOptions } from "#/apis/region";
import type { RegionInfo } from "#/apis/region";

export const useGetRegionsByProvince = () => {
	return useSuspenseQuery({
		...regionQueryOptions.list(),
		select: (response) => {
			const displayableRegions = response.data.regions.filter(
				(region) => region.status !== "INACTIVE",
			);
			const grouped = Map.groupBy(
				displayableRegions,
				(region) => region.province,
			);

			const sorted = new Map<string, RegionInfo[]>();
			for (const [province, regions] of grouped) {
				sorted.set(
					province,
					[...regions].sort((a, b) => {
						if (a.status !== b.status) {
							return a.status === "ACTIVE" ? -1 : 1;
						}

						return a.displayName.localeCompare(b.displayName, "ko");
					}),
				);
			}

			return sorted;
		},
	});
};
