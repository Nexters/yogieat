"use client";

import { useEffect, useRef, useState } from "react";

import { type Variants, motion, useInView } from "motion/react";
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
			<div className="md:ygi:px-10 ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:items-center ygi:justify-between ygi:px-6 ygi:py-4">
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
const heroContainerVariants: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.15, delayChildren: 0.1 },
	},
};

const heroItemVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const HeroSection = () => {
	const router = useRouter();
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			className="md:ygi:py-28 lg:ygi:px-10 ygi:bg-white ygi:px-6 ygi:py-20"
		>
			<div className="md:ygi:flex-row md:ygi:items-center md:ygi:justify-between ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-12">
				{/* Text */}
				<motion.div
					variants={heroContainerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="md:ygi:items-start md:ygi:text-left ygi:flex ygi:flex-col ygi:items-center ygi:gap-4 ygi:text-center"
				>
					<motion.p
						variants={heroItemVariants}
						className="ygi:caption-12-md ygi:text-text-secondary"
					>
						다인원을 위한 맛집 서비스
					</motion.p>
					<motion.div
						variants={heroItemVariants}
						className="ygi:flex ygi:flex-col ygi:gap-1"
					>
						<p className="ygi:display-28-bd ygi:text-text-primary">
							밥약속 생길 때마다 했던 고민
						</p>
						<p
							className="ygi:display-28-bd ygi:text-button-secondary"
							style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
						>
							&ldquo;어디가지..?&rdquo;
						</p>
					</motion.div>
					<motion.p
						variants={heroItemVariants}
						className="ygi:heading-20-bd ygi:text-text-primary"
					>
						이제 5분이면 끝!
					</motion.p>
					<motion.button
						variants={heroItemVariants}
						type="button"
						onClick={() => router.replace("/gathering/create")}
						className="ygi:mt-2 ygi:cursor-pointer ygi:rounded-full ygi:bg-button-secondary ygi:px-8 ygi:py-4 ygi:heading-18-bd ygi:text-text-inverse ygi:transition-colors ygi:hover:bg-button-secondary-hover"
					>
						모임 링크 만들기
					</motion.button>
				</motion.div>

				{/* Characters */}
				<motion.div
					variants={heroContainerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="md:ygi:gap-3 ygi:flex ygi:flex-row ygi:items-end ygi:gap-2"
				>
					{[
						{
							src: "/images/service-landing/hero-char-1.png",
							alt: "캐릭터 1",
						},
						{
							src: "/images/service-landing/hero-char-2.png",
							alt: "캐릭터 2",
						},
						{
							src: "/images/service-landing/hero-char-3.png",
							alt: "캐릭터 3",
						},
					].map((char) => (
						<motion.div key={char.alt} variants={heroItemVariants}>
							<Image
								src={char.src}
								alt={char.alt}
								width={200}
								height={200}
								className="md:ygi:w-[140px] lg:ygi:w-[180px] ygi:h-auto ygi:w-[90px]"
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

// ── Shared scroll reveal hook ───────────────────────────────────────────────
const useScrollReveal = () => {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });
	return { ref, isInView };
};

// ── FeatureText component ───────────────────────────────────────────────────
interface FeatureTextProps {
	badge: string;
	headline: string;
	isDark: boolean;
	isInView: boolean;
}

const FeatureText = ({
	badge,
	headline,
	isDark,
	isInView,
}: FeatureTextProps) => (
	<motion.div
		initial={{ opacity: 0, y: 40 }}
		animate={isInView ? { opacity: 1, y: 0 } : {}}
		transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
		className="md:ygi:items-start ygi:flex ygi:flex-col ygi:items-center ygi:gap-4"
	>
		<span
			className={`ygi:inline-block ygi:w-fit ygi:rounded-full ygi:px-4 ygi:py-1.5 ygi:body-14-bd ${
				isDark
					? "ygi:bg-white/10 ygi:text-text-inverse"
					: "ygi:bg-button-secondary/10 ygi:text-button-secondary"
			}`}
		>
			{badge}
		</span>
		<p
			className={`md:ygi:display-28-bd md:ygi:text-left ygi:text-center ygi:heading-22-bd ygi:whitespace-pre-line ${
				isDark ? "ygi:text-text-inverse" : "ygi:text-text-primary"
			}`}
		>
			{headline}
		</p>
	</motion.div>
);

// ── Feature1Section ──────────────────────────────────────────────────────────
const Feature1Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="md:ygi:py-24 lg:ygi:px-10 ygi:bg-palette-gray-100 ygi:px-6 ygi:py-16"
		>
			<div className="md:ygi:flex-row md:ygi:justify-between ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					badge="모임 링크 만들기"
					headline={"우리 모임 정보\n입력 한번에"}
					isDark={false}
					isInView={isInView}
				/>
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="ygi:flex ygi:flex-row ygi:gap-3"
				>
					{(
						["feature-1-screen-a", "feature-1-screen-b"] as const
					).map((name) => (
						<Image
							key={name}
							src={`/images/service-landing/${name}.png`}
							alt="모임 생성 화면"
							width={148}
							height={241}
							className="ygi:rounded-2xl ygi:shadow-lg"
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
};

// ── Feature2Section ──────────────────────────────────────────────────────────
const Feature2Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="md:ygi:py-24 lg:ygi:px-10 ygi:bg-palette-gray-800 ygi:px-6 ygi:py-16"
		>
			<div className="md:ygi:flex-row-reverse md:ygi:justify-between ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					badge="나의 의견 입력"
					headline={"먹기 싫은거, 먹고 싶은거\n나의 의견 입력 한번에"}
					isDark={true}
					isInView={isInView}
				/>
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="ygi:flex ygi:flex-row ygi:gap-3"
				>
					{(
						["feature-2-screen-a", "feature-2-screen-b"] as const
					).map((name) => (
						<Image
							key={name}
							src={`/images/service-landing/${name}.png`}
							alt="의견 입력 화면"
							width={130}
							height={281}
							className="ygi:rounded-2xl ygi:shadow-lg"
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
};

// ── Feature3Section ──────────────────────────────────────────────────────────
const feature3Screens = [
	{ name: "feature-3-screen-a", dir: -1, height: 434 },
	{ name: "feature-3-screen-b", dir: 1, height: 418 },
	{ name: "feature-3-screen-c", dir: -1, height: 398 },
];

const Feature3Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="md:ygi:py-24 lg:ygi:px-10 ygi:overflow-hidden ygi:bg-palette-gray-700 ygi:px-6 ygi:py-16"
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					badge="투표 결과 확인"
					headline={
						"친구들은 뭘 먹고 싶어 했을까?\n투표 결과로 확인해요"
					}
					isDark={true}
					isInView={isInView}
				/>
				{/* 이미지 하나씩 순차 등장: 좌→우→좌, mobile/pc 모두 max-width 제한 */}
				<div className="ygi:flex ygi:w-full ygi:flex-col ygi:items-center ygi:gap-4">
					{feature3Screens.map(({ name, dir, height }, i) => (
						<motion.div
							key={name}
							initial={{ opacity: 0, x: dir * 60 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{
								duration: 0.65,
								ease: "easeOut",
								delay: 0.3 + i * 0.2,
							}}
							className="md:ygi:max-w-[500px] ygi:w-full ygi:max-w-[400px]"
						>
							<Image
								src={`/images/service-landing/${name}.png`}
								alt={`투표 결과 화면 ${i + 1}`}
								width={654}
								height={height}
								className="ygi:w-full ygi:rounded-2xl ygi:shadow-lg"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

// ── Feature4Section ──────────────────────────────────────────────────────────
// 텍스트 TOP → 카카오 알림카드 → 맛집 리스트
const Feature4Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="md:ygi:py-24 lg:ygi:px-10 ygi:overflow-hidden ygi:px-6 ygi:py-16"
			style={{ backgroundColor: "#13181c" }}
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					badge="맛집 추천"
					headline={"투표 결과에 따라\n모임에 맞게 맛집 추천해요"}
					isDark={true}
					isInView={isInView}
				/>
				<div className="ygi:flex ygi:w-full ygi:flex-col ygi:items-center ygi:gap-4">
					{/* 카카오 알림 메시지 카드 */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{
							duration: 0.6,
							ease: "easeOut",
							delay: 0.4,
						}}
						className="ygi:w-full ygi:max-w-[360px]"
					>
						<Image
							src="/images/service-landing/feature-5-kakao.png"
							alt="카카오 알림 메시지"
							width={654}
							height={304}
							className="ygi:w-full ygi:rounded-2xl ygi:shadow-lg"
						/>
					</motion.div>
					{/* 맛집 추천 리스트 */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{
							duration: 0.7,
							ease: "easeOut",
							delay: 0.6,
						}}
						className="ygi:w-full ygi:max-w-[280px]"
					>
						<Image
							src="/images/service-landing/feature-4-screen.png"
							alt="맛집 추천 화면"
							width={654}
							height={752}
							className="ygi:w-full ygi:rounded-3xl ygi:shadow-2xl"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

// ── Feature5Section ──────────────────────────────────────────────────────────
// 카카오 OG 링크 미리보기 카드 (HTML/CSS로 구현, Framer 레퍼런스 동일)
const Feature5Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="md:ygi:py-24 lg:ygi:px-10 ygi:px-6 ygi:py-16"
			style={{ backgroundColor: "#d5dae1" }}
		>
			<div className="md:ygi:flex-row-reverse md:ygi:justify-between ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					badge="링크 공유"
					headline={
						"오래 걸리던 맛집 정하기\n이제는 쉽고 편하게 결정해요"
					}
					isDark={false}
					isInView={isInView}
				/>
				{/* 카카오 OG 링크 미리보기 카드 */}
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="ygi:w-full ygi:max-w-[300px]"
				>
					<div className="ygi:overflow-hidden ygi:rounded-2xl ygi:bg-white ygi:shadow-xl">
						{/* 썸네일 영역 */}
						<div
							className="ygi:flex ygi:h-[120px] ygi:items-center ygi:justify-center"
							style={{
								background:
									"linear-gradient(135deg, #FF5A3C 0%, #FF8A6B 100%)",
							}}
						>
							<LandingLogoIcon
								color="white"
								width={100}
								height={32}
							/>
						</div>
						{/* 텍스트 정보 영역 */}
						<div className="ygi:flex ygi:flex-col ygi:gap-0.5 ygi:border-t ygi:border-palette-gray-100 ygi:px-4 ygi:py-3">
							<p className="ygi:body-14-bd ygi:text-text-primary">
								메뉴 추천이 완료되었어요
							</p>
							<p className="ygi:caption-12-rg ygi:text-text-secondary">
								[요기잇] 추천 결과를 확인해 보세요
							</p>
							<p className="ygi:caption-12-rg ygi:text-button-secondary">
								www.yogieat.com
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

// ── CTA Section ─────────────────────────────────────────────────────────────
const CtaSection = () => {
	const router = useRouter();
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="lg:ygi:px-10 ygi:bg-palette-gray-800 ygi:px-6 ygi:py-24"
		>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-8 ygi:text-center"
			>
				<p className="ygi:display-28-bd ygi:whitespace-pre-line ygi:text-text-inverse">
					{"지금 바로 요기잇으로\n맛집을 추천 받아요"}
				</p>
				<button
					type="button"
					onClick={() => router.push("/gathering/create")}
					className="ygi:cursor-pointer ygi:rounded-full ygi:bg-button-secondary ygi:px-8 ygi:py-4 ygi:heading-18-bd ygi:text-text-inverse ygi:transition-colors ygi:hover:bg-button-secondary-hover"
				>
					바로 시작하기
				</button>
			</motion.div>
		</section>
	);
};

// ── Footer ───────────────────────────────────────────────────────────────────
const LandingFooter = () => (
	<footer
		className="lg:ygi:px-10 ygi:px-6 ygi:py-10"
		style={{ backgroundColor: "#13181c" }}
	>
		<div className="ygi:mx-auto ygi:flex ygi:max-w-[1200px] ygi:flex-col ygi:items-center ygi:gap-4 ygi:text-center">
			<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-2">
				<p className="ygi:body-14-rg ygi:text-white/60">
					문의:{" "}
					<a
						href="mailto:hereeatt@gmail.com"
						className="ygi:text-white ygi:underline"
					>
						hereeatt@gmail.com
					</a>
				</p>
				<div className="ygi:flex ygi:gap-4">
					<a
						href="#"
						className="ygi:caption-12-rg ygi:text-white/60 ygi:transition-colors ygi:hover:text-white"
					>
						이용약관
					</a>
					<a
						href="#"
						className="ygi:caption-12-rg ygi:text-white/60 ygi:transition-colors ygi:hover:text-white"
					>
						개인정보 처리 방침
					</a>
				</div>
			</div>
			<p className="ygi:caption-12-rg ygi:text-white/40">
				© 2026 Team Yogieat. All rights reserved.
			</p>
		</div>
	</footer>
);

// ── ServiceLandingPage ───────────────────────────────────────────────────────
export const ServiceLandingPage = () => {
	return (
		<div className="ygi:w-full ygi:overflow-x-hidden">
			<Navbar />
			<main className="ygi:pt-[65px]">
				<HeroSection />
				<Feature1Section />
				<Feature2Section />
				<Feature3Section />
				<Feature4Section />
				<Feature5Section />
				<CtaSection />
			</main>
			<LandingFooter />
		</div>
	);
};
