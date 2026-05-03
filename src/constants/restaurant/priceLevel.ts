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
 * 서버에서 받은 priceLevel 문자열("₩")을 1~5 활성 동전 수로 환산.
 * "₩" 이외의 문자는 무시한다(현재 응답이 "₩" 5개 이상도 올 수 있어 max 클램프).
 *
 * @returns 1 ~ 5 사이의 활성 동전 수, 0이면 표시 대상이 아님
 */
export const getActivePriceLevelCount = (priceLevel: string | null): number => {
	if (!priceLevel) return 0;
	const wonCount = (priceLevel.match(/₩/g) ?? []).length;
	return Math.min(wonCount, MAX_PRICE_LEVEL);
};
