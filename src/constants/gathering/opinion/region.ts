import type { Region } from "#/types/gathering";

export interface RegionOption {
	id: NonNullable<Region>;
	label: string;
}

export const REGION_OPTIONS: RegionOption[] = [
	{
		id: "HONGDAE",
		label: "홍대입구역",
	},
	{
		id: "GANGNAM",
		label: "강남역",
	},
] as const;
