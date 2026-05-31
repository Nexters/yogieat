"use client";

import type { RestaurantDetail } from "#/apis/restaurant";

import { MakerAvatar, pickVariant } from "./MakerAvatar";

interface MakerPickSectionProps {
	restaurant: RestaurantDetail;
}

/** 제목 기본 라벨 (apostrophe 는 디자인과 동일하게 U+2019 사용) */
const defaultTitle = "요기잇 메이커’s pick";

/**
 * null / 빈 문자열 / 공백 / "-" 를 모두 "값 없음"으로 정규화한다.
 * 서버가 빈 데이터를 "-" 로 내려주는 케이스를 흡수하기 위함.
 */
const normalize = (value?: string | null): string | null => {
	const trimmed = value?.trim();
	return trimmed && trimmed !== "-" ? trimmed : null;
};

export const MakerPickSection = ({ restaurant }: MakerPickSectionProps) => {
	const reason = normalize(restaurant.teamRecommendationReason);

	// 본문(추천 사유)이 없으면 섹션 자체를 렌더링하지 않는다.
	if (!reason) {
		return null;
	}

	const title = normalize(restaurant.teamRecommendationTitle) ?? defaultTitle;

	return (
		<section className="ygi:px-5 ygi:py-4">
			{/* 회색 라운드 카드: AiSummary 본문 카드와 동일한 surface-lightgray(=gray-50) 패턴 */}
			<div className="ygi:flex ygi:items-center ygi:gap-3 ygi:rounded-md ygi:bg-surface-lightgray ygi:p-4">
				<MakerAvatar variant={pickVariant(restaurant.restaurantId)} />

				<div className="ygi:flex ygi:min-w-0 ygi:flex-1 ygi:flex-col">
					{/* 제목: 14px Medium, 1줄 말줄임 (시안 정책상 공백 포함 20자) */}
					<span className="ygi:truncate ygi:body-14-md ygi:text-text-secondary">
						{title}
					</span>
					{/* 본문(추천 사유): 14px Bold */}
					<p className="ygi:body-14-bd ygi:break-keep ygi:whitespace-break-spaces ygi:text-text-primary">
						{reason}
					</p>
				</div>
			</div>
		</section>
	);
};
