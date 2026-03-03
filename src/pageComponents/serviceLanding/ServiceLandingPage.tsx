"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useInView } from "motion/react";
import Image from "next/image";
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

// ── Hero Section ─────────────────────────────────────────────────────────────
const heroContainerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.15, delayChildren: 0.1 },
	},
};

const heroItemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const HeroSection = () => {
	const router = useRouter();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			className="ygi:bg-white ygi:px-6 ygi:py-20 md:ygi:py-28 lg:ygi:px-10"
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-12 md:ygi:flex-row md:ygi:items-center md:ygi:justify-between">
				{/* Text */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-4 ygi:text-center md:ygi:items-start md:ygi:text-left"
				>
					<p className="ygi:caption-12-md ygi:text-text-secondary">
						다인원을 위한 맛집 서비스
					</p>
					<div className="ygi:flex ygi:flex-col ygi:gap-1">
						<p className="ygi:display-28-bd ygi:text-text-primary">
							밥약속 생길 때마다 했던 고민
						</p>
						<p
							className="ygi:display-28-bd ygi:text-button-secondary"
							style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
						>
							&ldquo;어디가지..?&rdquo;
						</p>
					</div>
					<p className="ygi:heading-20-bd ygi:text-text-primary">
						이제 5분이면 끝!
					</p>
					<button
						type="button"
						onClick={() => router.push("/gathering/create")}
						className="ygi:mt-2 ygi:cursor-pointer ygi:rounded-full ygi:bg-button-secondary ygi:px-8 ygi:py-4 ygi:heading-18-bd ygi:text-text-inverse ygi:transition-colors ygi:hover:bg-button-secondary-hover"
					>
						모임 링크 만들기
					</button>
				</motion.div>

				{/* Characters */}
				<motion.div
					variants={heroContainerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="ygi:flex ygi:flex-row ygi:items-end ygi:gap-2 md:ygi:gap-3"
				>
					{[
						{ src: "/images/service-landing/hero-char-1.png", alt: "캐릭터 1" },
						{ src: "/images/service-landing/hero-char-2.png", alt: "캐릭터 2" },
						{ src: "/images/service-landing/hero-char-3.png", alt: "캐릭터 3" },
					].map((char) => (
						<motion.div key={char.alt} variants={heroItemVariants}>
							<Image
								src={char.src}
								alt={char.alt}
								width={200}
								height={200}
								className="ygi:h-auto ygi:w-[90px] md:ygi:w-[140px] lg:ygi:w-[180px]"
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

// ── ServiceLandingPage ───────────────────────────────────────────────────────
export const ServiceLandingPage = () => {
	return (
		<div className="ygi:w-full ygi:overflow-x-hidden">
			<Navbar />
			<main className="ygi:pt-[65px]">
				<HeroSection />
				{/* Feature sections will be added here */}
			</main>
		</div>
	);
};
