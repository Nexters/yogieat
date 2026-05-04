"use client";

import { useMutationState } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { recommendResultMutationKeys } from "#/apis/recommendResult";
import type { RerollRecommendResultResponse } from "#/apis/recommendResult";
import { useRerollRecommendResult } from "#/hooks/apis/recommendResult";
import type { Restaurant } from "#/types/gathering";
import type { ApiResponse } from "#/utils/api/types";
import { toast } from "#/utils/toast";

export type PageStatus = "ready" | "loading" | "error";

export interface CarouselPage {
	status: PageStatus;
	restaurants: Restaurant[];
}

interface UseRerollRestaurantsProps {
	accessKey: string;
	initialList: Restaurant[];
	maxRerollCount: number;
}

interface UseRerollRestaurantsReturn {
	pages: CarouselPage[];
	prefetchPage: (pageIndex: number) => void;
	totalPages: number;
}

interface MutationSnapshot {
	status: "pending" | "success" | "error" | "idle";
	data: ApiResponse<RerollRecommendResultResponse> | undefined;
}

const ERROR_TOAST_MESSAGE =
	"맛집을 더 불러오지 못했어요. 잠시 후 다시 시도해주세요.";

export const useRerollRestaurants = ({
	accessKey,
	initialList,
	maxRerollCount,
}: UseRerollRestaurantsProps): UseRerollRestaurantsReturn => {
	const { mutate } = useRerollRecommendResult(accessKey);

	const totalPages = maxRerollCount + 1;

	// 모든 mutation 인스턴스를 시간 순으로 받는다. 인덱스 i = 페이지 (i + 1)
	const allRerollMutations = useMutationState<MutationSnapshot>({
		filters: {
			mutationKey: recommendResultMutationKeys.reroll(accessKey),
		},
		select: (mutation) => ({
			status: mutation.state.status,
			data: mutation.state.data as
				| ApiResponse<RerollRecommendResultResponse>
				| undefined,
		}),
	});

	const pages: CarouselPage[] = useMemo(() => {
		return Array.from({ length: totalPages }, (_, i) => {
			if (i === 0) {
				return { status: "ready", restaurants: initialList };
			}
			const m = allRerollMutations[i - 1];
			if (!m) {
				// 아직 호출되지 않음. 사용자 도달 시 loading UI 로 보이도록 통합
				return { status: "loading", restaurants: [] };
			}
			const list =
				m.status === "success" ? m.data?.data?.list : undefined;
			if (list) {
				return { status: "ready", restaurants: list };
			}
			if (m.status === "error") {
				return { status: "error", restaurants: [] };
			}
			return { status: "loading", restaurants: [] };
		});
	}, [allRerollMutations, initialList, totalPages]);

	// 새 에러 페이지 발생 시 1회 토스트, ready 로 복귀하면 다시 알릴 수 있게 ref 갱신
	const notifiedErrorIndicesRef = useRef<Set<number>>(new Set());
	useEffect(() => {
		pages.forEach((p, i) => {
			if (
				p.status === "error" &&
				!notifiedErrorIndicesRef.current.has(i)
			) {
				toast.warning(ERROR_TOAST_MESSAGE);
				notifiedErrorIndicesRef.current.add(i);
			}
			if (
				p.status === "ready" &&
				notifiedErrorIndicesRef.current.has(i)
			) {
				notifiedErrorIndicesRef.current.delete(i);
			}
		});
	}, [pages]);

	// 동일 render 내 동기 dedup: mutation cache 가 'pending' 으로 반영되기 전에
	// 같은 pageIndex 로 prefetchPage 가 두 번 호출되는 race 를 차단한다.
	const inFlightRef = useRef<Set<number>>(new Set());

	// 페이지 N 의 prefetch: 페이지 N-1 이 ready 일 때만 호출. 멱등(ready/pending 시 noop)
	const prefetchPage = useCallback(
		(pageIndex: number) => {
			if (pageIndex <= 0 || pageIndex >= totalPages) return;

			const target = pages[pageIndex];
			const prev = pages[pageIndex - 1];
			if (!target || !prev) return;
			if (prev.status !== "ready") return;
			if (target.status === "ready") return;

			// loading 상태 중 실제로 mutation 이 'pending' 인 경우는 skip (이미 in-flight)
			const m = allRerollMutations[pageIndex - 1];
			if (m && m.status === "pending") return;

			if (inFlightRef.current.has(pageIndex)) return;
			inFlightRef.current.add(pageIndex);

			const accumulatedIds = pages
				.slice(0, pageIndex)
				.flatMap((p) => p.restaurants.map((r) => r.restaurantId));
			mutate(
				{ accessKey, restaurantIds: accumulatedIds },
				{
					onSettled: () => {
						inFlightRef.current.delete(pageIndex);
					},
				},
			);
		},
		[accessKey, allRerollMutations, mutate, pages, totalPages],
	);

	return { pages, prefetchPage, totalPages };
};
