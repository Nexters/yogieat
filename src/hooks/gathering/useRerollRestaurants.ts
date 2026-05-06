"use client";

import { useMutationState } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { recommendResultMutationKeys } from "#/apis/recommendResult";
import type { RerollRecommendResultResponse } from "#/apis/recommendResult";
import { useRerollRecommendResult } from "#/hooks/apis/recommendResult";
import type { Restaurant } from "#/types/gathering";
import type { ApiResponse } from "#/utils/api/types";
import { toast } from "#/utils/toast";

type PageStatus = "ready" | "loading" | "error";

interface CarouselPage {
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

export const useRerollRestaurants = ({
	accessKey,
	initialList,
	maxRerollCount,
}: UseRerollRestaurantsProps): UseRerollRestaurantsReturn => {
	const { mutate } = useRerollRecommendResult(accessKey);

	const totalPages = maxRerollCount + 1;
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
		return Array.from({ length: totalPages }, (_, pageIndex) => {
			if (pageIndex === 0) {
				return { status: "ready", restaurants: initialList };
			}
			const mutation = allRerollMutations[pageIndex - 1];
			if (!mutation) {
				return { status: "loading", restaurants: [] };
			}
			const fetchedList =
				mutation.status === "success"
					? mutation.data?.data?.list
					: undefined;
			if (fetchedList) {
				return { status: "ready", restaurants: fetchedList };
			}
			if (mutation.status === "error") {
				return { status: "error", restaurants: [] };
			}
			return { status: "loading", restaurants: [] };
		});
	}, [allRerollMutations, initialList, totalPages]);

	const notifiedErrorIndicesRef = useRef<Set<number>>(new Set());
	const inFlightRef = useRef<Set<number>>(new Set());

	const prefetchPage = useCallback(
		(pageIndex: number) => {
			if (pageIndex <= 0 || pageIndex >= totalPages) return;

			const targetPage = pages[pageIndex];
			const previousPage = pages[pageIndex - 1];
			if (!targetPage || !previousPage) return;
			if (previousPage.status !== "ready") return;
			if (targetPage.status === "ready") return;

			const mutation = allRerollMutations[pageIndex - 1];
			if (mutation && mutation.status === "pending") return;

			if (inFlightRef.current.has(pageIndex)) return;
			inFlightRef.current.add(pageIndex);

			const accumulatedIds = pages
				.slice(0, pageIndex)
				.flatMap((page) =>
					page.restaurants.map(
						(restaurant) => restaurant.restaurantId,
					),
				);
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

	useEffect(() => {
		pages.forEach((page, pageIndex) => {
			if (
				page.status === "error" &&
				!notifiedErrorIndicesRef.current.has(pageIndex)
			) {
				toast.warning(
					"맛집을 더 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
				);
				notifiedErrorIndicesRef.current.add(pageIndex);
			}
			if (
				page.status === "ready" &&
				notifiedErrorIndicesRef.current.has(pageIndex)
			) {
				notifiedErrorIndicesRef.current.delete(pageIndex);
			}
		});
	}, [pages]);

	return { pages, prefetchPage, totalPages };
};
