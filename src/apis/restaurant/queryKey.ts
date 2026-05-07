/**
 * restaurant API QueryKey 관리
 */
export const restaurantKeys = {
	all: ["restaurant"] as const,
	detail: (id: string) => [...restaurantKeys.all, id] as const,
};
