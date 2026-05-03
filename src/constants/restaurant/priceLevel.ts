export const MAX_PRICE_LEVEL = 5;

export type PriceLevelStep = 1 | 2 | 3 | 4 | 5;

export const PRICE_LEVEL_LABEL: Record<PriceLevelStep, string> = {
	1: "가격이 착한 편이에요",
	2: "부담 없는 가격이에요",
	3: "무난한 가격이에요",
	4: "살짝 비싼 편이에요",
	5: "꽤 비싼 편이에요",
};

/**
 * 서버에서 받은 priceLevel(1~5 정수)을 활성 동전 수로 환산.
 * 서버 응답이 5 초과로 올 가능성에 대비해 최대 5로 클램프하며,
 * 0 이하 또는 null 이면 표시 대상이 아님(0).
 *
 * @returns 1 ~ 5 사이의 활성 동전 수
 */
export const getActivePriceLevelCount = (priceLevel: number | null): number => {
	if (priceLevel === null || priceLevel <= 0) return 0;
	return Math.min(Math.floor(priceLevel), MAX_PRICE_LEVEL);
};
