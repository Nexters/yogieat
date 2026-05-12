"use client";

import Image from "next/image";

import { colors } from "#/constants/color";

const computeDistanceSubtitle = (distances: Record<string, number>): string => {
	const near = distances["RANGE_500M"] ?? 0;
	const far = distances["RANGE_1KM"] ?? 0;
	const any = distances["ANY"] ?? 0;

	// ANY만 있는 경우
	if (near === 0 && far === 0 && any > 0) {
		return `모임원 모두가 "어디든 상관없어"`;
	}

	if (near > far) return `치열한 고민 끝에 "가까운 맛집"으로`;
	if (far > near) return `치열한 고민 끝에 "멀어도 감수"`;
	if (near === far && near > 0) return `치열한 고민 끝에 "반반"으로`;

	// near == far == 0 (empty 포함) fallback
	return `모임원 모두가 "어디든 상관없어"`;
};

export const DistanceVoteBlock = ({
	distances,
}: {
	distances: Record<string, number>;
}) => {
	const subtitle = computeDistanceSubtitle(distances);
	const near = distances["RANGE_500M"] ?? 0;
	const far = distances["RANGE_1KM"] ?? 0;
	const total = near + far;
	const isAllAny = near === 0 && far === 0;

	const nearPct = total === 0 ? 0 : Math.round((near / total) * 100);
	const farPct = total === 0 ? 0 : 100 - nearPct;

	return (
		<div className="ygi:flex ygi:flex-col ygi:rounded-md ygi:bg-surface-white ygi:p-5">
			{/* 타이틀 + subtitle */}
			<div className="ygi:mb-5 ygi:flex ygi:flex-col ygi:gap-1">
				<span className="ygi:body-14-md ygi:text-text-secondary">
					맛집의 거리는
				</span>
				<p className="ygi:body-16-sb ygi:text-text-primary">
					{subtitle}
				</p>
			</div>

			{/* VS 행 */}
			<div className="ygi:mb-2 ygi:flex ygi:items-center ygi:justify-between">
				{/* 걷기 싫어 */}
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<div className="ygi:flex ygi:size-7 ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-gray">
						<Image
							src="/images/result/distance-near.svg"
							alt="걷기 싫어"
							width={26}
							height={26}
						/>
					</div>
					<div className="ygi:flex ygi:items-center">
						<div
							style={{
								width: 0,
								height: 0,
								borderTop: "5px solid transparent",
								borderBottom: "5px solid transparent",
								borderRight: `6px solid ${colors.surface.primary}`,
							}}
						/>
						<span className="ygi:rounded-xs ygi:bg-surface-primary ygi:px-2 ygi:py-1 ygi:caption-12-sb ygi:text-text-interactive">
							걷기 싫어
						</span>
					</div>
				</div>

				{/* VS */}
				<span className="ygi:caption-12-bd ygi:text-text-placeholder">
					VS
				</span>

				{/* 멀어도 감수 */}
				<div className="ygi:flex ygi:items-center ygi:gap-1">
					<div className="ygi:flex ygi:items-center">
						<span className="ygi:rounded-xs ygi:bg-surface-secondary ygi:px-2 ygi:py-1 ygi:caption-12-sb ygi:text-palette-secondary-700">
							멀어도 감수
						</span>
						<div
							style={{
								width: 0,
								height: 0,
								borderTop: "5px solid transparent",
								borderBottom: "5px solid transparent",
								borderLeft: `6px solid ${colors.surface.secondary}`,
							}}
						/>
					</div>
					<div className="ygi:flex ygi:size-7 ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-gray">
						<Image
							src="/images/result/distance-far.svg"
							alt="멀어도 감수"
							width={26}
							height={26}
						/>
					</div>
				</div>
			</div>

			{/* 게이지 바 */}
			<div className="ygi:relative ygi:mb-2 ygi:h-6 ygi:w-full ygi:overflow-hidden ygi:rounded-sm">
				{isAllAny ? (
					// 전원 상관없음: linear-gradient
					<div
						className="ygi:flex ygi:size-full ygi:items-center ygi:justify-center"
						style={{
							background: `linear-gradient(to right, ${colors.palette.primary[500]}, ${colors.palette.secondary[300]})`,
						}}
					>
						<span className="ygi:caption-12-bd ygi:text-text-inverse">
							100%
						</span>
					</div>
				) : (
					// 배경: far 색상 (전체)
					<div
						className="ygi:absolute ygi:inset-0"
						style={{
							backgroundColor: colors.palette.secondary[300],
						}}
					>
						{/* near 오버레이 (왼쪽부터) */}
						{nearPct > 0 && (
							<div
								className="ygi:absolute ygi:inset-y-0 ygi:left-0 ygi:flex ygi:items-center ygi:pl-2"
								style={{
									width: `${nearPct}%`,
									backgroundColor:
										colors.palette.primary[500],
								}}
							>
								{nearPct >= 15 && (
									<span className="ygi:caption-12-bd ygi:text-white">
										{nearPct}%
									</span>
								)}
							</div>
						)}
						{/* far 퍼센트 텍스트 (오른쪽) */}
						{farPct >= 15 && (
							<div className="ygi:absolute ygi:inset-y-0 ygi:right-0 ygi:flex ygi:items-center ygi:pr-2">
								<span className="ygi:caption-12-bd ygi:text-white">
									{farPct}%
								</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* 도보 시간 레이블 */}
			<div className="ygi:flex ygi:justify-between">
				<span className="ygi:caption-12-md ygi:text-text-secondary">
					도보 7분 내
				</span>
				<span className="ygi:caption-12-md ygi:text-text-secondary">
					도보 15분 내
				</span>
			</div>
		</div>
	);
};
