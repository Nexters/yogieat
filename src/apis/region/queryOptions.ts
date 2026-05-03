import { queryOptions } from "@tanstack/react-query";

import { getRegions } from "./api";
import { regionKeys } from "./queryKey";

/**
 * 지역 관련 Query Options Factory
 */
export const regionQueryOptions = {
	list: () =>
		queryOptions({
			queryKey: regionKeys.list(),
			queryFn: () => getRegions(),
		}),
};
