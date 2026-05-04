"use client";

import {
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { useRerollRestaurants } from "#/hooks/gathering";
import type { Restaurant } from "#/types/gathering";

import { DotIndicator } from "./DotIndicator";
import { NavArrowButton } from "./NavArrowButton";
import { RestaurantCarouselPage } from "./RestaurantCarouselPage";

interface RestaurantCarouselProps {
	accessKey: string;
	initialList: Restaurant[];
	maxRerollCount: number;
}

export const RestaurantCarousel = ({
	accessKey,
	initialList,
	maxRerollCount,
}: RestaurantCarouselProps) => {
	const { pages, prefetchPage, totalPages } = useRerollRestaurants({
		accessKey,
		initialList,
		maxRerollCount,
	});

	const trackRef = useRef<HTMLDivElement | null>(null);
	const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
	const visibilityRatiosRef = useRef<Map<number, number>>(new Map());
	const [currentPage, setCurrentPage] = useState(0);

	// IntersectionObserver: 가장 많이 보이는 페이지를 currentPage 로.
	// callback 의 entries 는 변화가 있었던 페이지만 포함하므로, 누적 Map 에 기록한 뒤
	// 모든 페이지의 누적 ratio 중 최댓값을 선정한다.
	useEffect(() => {
		const ratios = visibilityRatiosRef.current;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const idxAttr =
						entry.target.getAttribute("data-page-index");
					if (idxAttr === null) return;
					ratios.set(Number(idxAttr), entry.intersectionRatio);
				});

				let bestRatio = 0;
				let bestIndex: number | null = null;
				ratios.forEach((ratio, idx) => {
					if (ratio > bestRatio) {
						bestRatio = ratio;
						bestIndex = idx;
					}
				});

				if (bestIndex !== null && bestRatio >= 0.5) {
					setCurrentPage(bestIndex);
				}
			},
			{
				root: trackRef.current,
				threshold: [0, 0.25, 0.5, 0.75, 1],
			},
		);

		pageRefs.current.slice(0, totalPages).forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => {
			observer.disconnect();
			ratios.clear();
		};
	}, [totalPages]);

	// 마지막 도달 가능한 페이지: 0 (initialList 는 항상 ready) 부터 연속해서 ready 인 마지막 인덱스
	const lastReadyPage = useMemo(() => {
		let last = 0;
		for (let i = 1; i < pages.length; i += 1) {
			if (pages[i].status === "ready") last = i;
			else break;
		}
		return last;
	}, [pages]);

	// "다음에 fetch 해야 할 페이지" = lastReadyPage + 1 만 호출 시도. 직렬 의존성을 자연스럽게 표현하며,
	// 사용자가 페이지 1 loading 중에 페이지 2 로 빠르게 swipe 한 경우에도 페이지 1 이 ready 가 되는 시점에
	// 자동으로 페이지 2 가 호출된다.
	useEffect(() => {
		prefetchPage(lastReadyPage + 1);
	}, [lastReadyPage, prefetchPage]);

	const scrollToPage = useCallback((pageIndex: number) => {
		const track = trackRef.current;
		if (!track) return;
		const pageWidth = track.clientWidth;
		track.scrollTo({ left: pageIndex * pageWidth, behavior: "smooth" });
	}, []);

	const handlePrev = useCallback(() => {
		if (currentPage <= 0) return;
		scrollToPage(currentPage - 1);
	}, [currentPage, scrollToPage]);

	const handleNext = useCallback(() => {
		const nextIndex = currentPage + 1;
		if (nextIndex >= totalPages) return;
		scrollToPage(nextIndex);
	}, [currentPage, scrollToPage, totalPages]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				handlePrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				handleNext();
			}
		},
		[handleNext, handlePrev],
	);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-3">
			<div className="ygi:group/carousel ygi:relative">
				<div
					ref={trackRef}
					role="region"
					aria-roledescription="carousel"
					aria-label="추천 식당 캐러셀"
					tabIndex={0}
					onKeyDown={handleKeyDown}
					className="ygi:flex ygi:snap-x ygi:snap-mandatory ygi:overflow-x-auto ygi:overflow-y-hidden ygi:[scrollbar-width:none] ygi:focus:outline-none ygi:focus-visible:ring-2 ygi:focus-visible:ring-palette-primary-500 ygi:[&::-webkit-scrollbar]:hidden"
				>
					{pages.map((page, i) => (
						<div
							key={i}
							ref={(el) => {
								pageRefs.current[i] = el;
							}}
							data-page-index={i}
							className="ygi:w-full ygi:shrink-0 ygi:snap-center"
						>
							<RestaurantCarouselPage
								status={page.status}
								restaurants={page.restaurants}
								pageIndex={i}
								totalPages={totalPages}
							/>
						</div>
					))}
				</div>

				<NavArrowButton
					direction="prev"
					onClick={handlePrev}
					disabled={currentPage === 0}
				/>
				<NavArrowButton
					direction="next"
					onClick={handleNext}
					disabled={currentPage >= totalPages - 1}
				/>
			</div>

			<DotIndicator total={totalPages} current={currentPage} />
		</div>
	);
};
