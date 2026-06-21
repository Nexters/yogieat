import type { Metadata } from "next";

import { getRestaurantDetail } from "#/apis/restaurant";
import { CATEGORY_LABEL } from "#/constants/gathering/opinion";

/**
 * 식당 상세 데이터 기반 메타데이터를 생성한다.
 *
 * canonical 은 항상 정식 식당 상세 경로(`/restaurants/[id]`)를 가리키므로,
 * 랜덤 뽑기 결과 페이지처럼 동일 콘텐츠를 다른 URL 로 노출하는 화면에서 호출하면
 * 색인·랭킹 신호가 식당 상세 페이지로 통합된다(duplicate content 방지).
 */
export async function buildRestaurantDetailMetadata(
	restaurantId: string,
): Promise<Metadata> {
	try {
		const { data: restaurant } = await getRestaurantDetail(restaurantId);

		const title = `${restaurant.restaurantName} | ${CATEGORY_LABEL[restaurant.largeCategory]}`;
		const description = "[요기잇] 추천 맛집을 확인해보세요.";
		const canonicalPath = `/restaurants/${restaurantId}`;

		return {
			title,
			description,
			alternates: { canonical: canonicalPath },
			openGraph: {
				title,
				description,
				type: "website",
				locale: "ko_KR",
				siteName: "요기잇",
				url: canonicalPath,
				...(restaurant.imageUrl && {
					images: [
						{
							url: restaurant.imageUrl,
							alt: restaurant.restaurantName,
						},
					],
				}),
			},
		};
	} catch {
		return {};
	}
}
