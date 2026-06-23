import type { GeoJsonGeometry } from "#/types/geo";

/** 지역 좌표 정보 */
export type Coordinates = GeoJsonGeometry;

/** 지역 정보 */
export type RegionStatus = "ACTIVE" | "PENDING" | "INACTIVE";

export interface RegionInfo {
	/** 지역 코드 (예: GANGNAM) */
	code: string;
	/** 시/도 (예: 서울) */
	province: string;
	/** 표시 이름 (예: 강남역) */
	displayName: string;
	/** 지역 운영 상태 */
	status: RegionStatus;
	/** 기준 좌표 */
	coordinatesStandard: Coordinates;
}

/** 지역 목록 조회 응답 */
export interface GetRegionsResponse {
	regions: RegionInfo[];
}
