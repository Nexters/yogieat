"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { LandingLogoIcon } from "#/icons/landingLogoIcon";

// ── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`ygi:fixed ygi:top-0 ygi:right-0 ygi:left-0 ygi:z-50 ygi:bg-white ygi:transition-shadow ygi:duration-300 ${scrolled ? "ygi:shadow-md" : ""}`}
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:items-center ygi:justify-between ygi:px-6 ygi:py-4 md:ygi:px-10">
				<LandingLogoIcon
					color="#1f2933"
					width={80}
					height={25}
					aria-label="요기잇"
				/>
				<button
					type="button"
					onClick={() => router.push("/gathering/create")}
					className="ygi:cursor-pointer ygi:rounded-full ygi:bg-button-secondary ygi:px-5 ygi:py-2.5 ygi:body-14-bd ygi:text-text-inverse ygi:transition-colors ygi:hover:bg-button-secondary-hover"
				>
					바로 시작하기
				</button>
			</div>
		</header>
	);
};

// ── ServiceLandingPage ───────────────────────────────────────────────────────
export const ServiceLandingPage = () => {
	return (
		<div className="ygi:w-full ygi:overflow-x-hidden">
			<Navbar />
			<main className="ygi:pt-[65px]">
				{/* Feature sections will be added here */}
			</main>
		</div>
	);
};
