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
	const { pages, totalPages, prefetchPage } = useRerollRestaurants({
		accessKey,
		initialList,
		maxRerollCount,
	});

	const trackRef = useRef<HTMLDivElement | null>(null);
	const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
	const visibilityRatiosRef = useRef<Map<number, number>>(new Map());
	const [currentPage, setCurrentPage] = useState(0);

	const lastReadyPage = useMemo(() => {
		let last = 0;
		for (let i = 1; i < pages.length; i += 1) {
			if (pages[i].status === "ready") last = i;
			else break;
		}
		return last;
	}, [pages]);

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

	useEffect(() => {
		prefetchPage(lastReadyPage + 1);
	}, [lastReadyPage, prefetchPage]);

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

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-3">
			<div className="ygi:group/carousel ygi:relative ygi:-mx-4">
				<div
					ref={trackRef}
					role="region"
					aria-roledescription="carousel"
					aria-label="추천 식당 캐러셀"
					tabIndex={0}
					onKeyDown={handleKeyDown}
					className="ygi:flex ygi:snap-x ygi:snap-mandatory ygi:overflow-x-auto ygi:overflow-y-hidden ygi:px-4 ygi:[scrollbar-width:none] ygi:focus:outline-none ygi:focus-visible:ring-2 ygi:focus-visible:ring-palette-primary-500 ygi:[&::-webkit-scrollbar]:hidden"
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
