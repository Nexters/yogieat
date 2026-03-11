"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { type Variants, motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { MeetingCompleteIllustration } from "#/components/illustrations/MeetingCompleteIllustration";
import { LandingIntroLottie } from "#/pageComponents/gathering/opinion/landing/LandingIntroLottie";
import { LandingLogoIcon } from "#/icons/landingLogoIcon";

// ── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
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
			<div className="md:ygi:px-10 ygi:mx-auto ygi:flex ygi:max-w-300 ygi:items-center ygi:justify-between ygi:px-6 ygi:py-4">
				<LandingLogoIcon
					color="#1f2933"
					width={80}
					height={25}
					aria-label="요기잇"
				/>
				<Link
					href="/gathering/create"
					className="ygi:cursor-pointer ygi:rounded-full ygi:bg-button-secondary ygi:px-5 ygi:py-2.5 ygi:body-14-bd ygi:text-text-inverse ygi:transition-colors ygi:hover:bg-button-secondary-hover"
				>
					바로 시작하기
				</Link>
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
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			className="ygi:px-6 ygi:py-20"
			style={{ backgroundColor: "#FF5A3C" }}
		>
			<motion.div
				variants={heroContainerVariants}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				className="ygi:mx-auto ygi:flex ygi:max-w-300 ygi:flex-col ygi:items-center ygi:gap-10"
			>
				{/* Text block */}
				<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-4 ygi:text-center">
					<motion.p
						variants={heroItemVariants}
						className="ygi:caption-12-md ygi:text-white/80"
					>
						다인원을 위한 맛집 추천 서비스
					</motion.p>
					<motion.div variants={heroItemVariants}>
						<LandingLogoIcon
							color="white"
							width={170}
							height={52}
							aria-label="요기잇"
						/>
					</motion.div>
					<motion.div
						variants={heroItemVariants}
						className="ygi:mt-2"
					>
						<Link
							href="/gathering/create"
							className="ygi:inline-flex ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-white ygi:px-8 ygi:py-4 ygi:heading-18-bd ygi:text-text-primary ygi:transition-colors ygi:hover:bg-white/90"
						>
							바로 시작하기
						</Link>
					</motion.div>
				</div>

				{/* Characters - Lottie */}
				<motion.div
					variants={heroItemVariants}
					className="ㄴygi:w-full ygi:max-w-90"
					style={{ height: 220 }}
				>
					<LandingIntroLottie />
				</motion.div>
			</motion.div>
		</section>
	);
};

// ── Pain Point Section ────────────────────────────────────────────────────────
const PainPointSection = () => {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<section
			ref={ref}
			className="ygi:bg-palette-gray-800 ygi:px-6 ygi:py-16"
		>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="ygi:mx-auto ygi:flex ygi:max-w-300 ygi:flex-col ygi:items-center ygi:gap-6 ygi:text-center"
			>
				<p className="ygi:body-16-rg ygi:whitespace-pre-line ygi:text-palette-gray-300">
					{"밥약속 생길 때마다 했던 고민\n\u201c어디가지..?\u201d"}
				</p>
				<div className="ygi:flex ygi:items-center ygi:justify-center">
					<MeetingCompleteIllustration className="ygi:h-45 ygi:w-45" />
				</div>
				<p className="ygi:heading-22-bd ygi:text-text-inverse">
					이제 5분이면 끝!
				</p>
			</motion.div>
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
	caption: string;
	headline: ReactNode;
	isDark: boolean;
	isInView: boolean;
}

const FeatureText = ({
	caption,
	headline,
	isDark,
	isInView,
}: FeatureTextProps) => (
	<motion.div
		initial={{ opacity: 0, y: 40 }}
		animate={isInView ? { opacity: 1, y: 0 } : {}}
		transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
		className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-2"
	>
		<p
			className={`ygi:body-16-md ygi:text-center ${
				isDark
					? "ygi:text-palette-gray-300"
					: "ygi:text-palette-gray-500"
			}`}
		>
			{caption}
		</p>
		<p
			className={`ygi:text-center ygi:heading-22-bd ygi:whitespace-pre-line ${
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
			className="ygi:overflow-hidden ygi:bg-palette-gray-100 ygi:px-6 ygi:pt-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center">
				<FeatureText
					caption="모임 링크 만들기"
					headline="우리 모임 정보 입력 한번에"
					isDark={false}
					isInView={isInView}
				/>
				{/* overflow-hidden으로 하단 overflow 초기 상태 클리핑 */}
				<div className="ygi:relative ygi:-bottom-14">
					<motion.div
						initial={{ opacity: 1, y: 72, scale: 0.88 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.7,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
						className="ygi:flex ygi:flex-row ygi:gap-3"
					>
						{(
							[
								"feature-1-screen-a",
								"feature-1-screen-b",
							] as const
						).map((name) => (
							<Image
								key={name}
								src={`/images/service-landing/${name}.png`}
								alt="모임 생성 화면"
								width={148}
								height={241}
								className="ygi:rounded-[10px] ygi:shadow-lg"
								priority
							/>
						))}
					</motion.div>
				</div>
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
			className="ygi:overflow-hidden ygi:px-6 ygi:pt-13.5"
			style={{ backgroundColor: "#d5dae2" }}
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center">
				<FeatureText
					caption="먹기 싫은거, 먹고 싶은거"
					headline={
						<>
							{"나의 "}
							<span className="ygi:text-button-secondary">
								의견 입력
							</span>
							{" 한번에"}
						</>
					}
					isDark={false}
					isInView={isInView}
				/>
				{/* overflow-hidden으로 하단 overflow 초기 상태 클리핑 */}
				<div className="ygi:relative ygi:-bottom-14">
					<motion.div
						initial={{ opacity: 1, y: 72, scale: 0.88 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.7,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
						className="ygi:flex ygi:flex-row ygi:gap-3"
					>
						{(
							[
								"feature-2-screen-a",
								"feature-2-screen-b",
							] as const
						).map((name) => (
							<Image
								key={name}
								src={`/images/service-landing/${name}.png`}
								alt="의견 입력 화면"
								width={148}
								height={321}
								className="ygi:rounded-[10px] ygi:shadow-lg"
								priority
							/>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

// ── Feature3Section ──────────────────────────────────────────────────────────
const feature3Screens = [
	{ name: "feature-3-screen-a", direction: -1, height: 151 },
	{ name: "feature-3-screen-b", direction: 1, height: 146 },
	{ name: "feature-3-screen-c", direction: -1, height: 139 },
];

const Feature3Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:bg-palette-gray-100 ygi:px-6 ygi:py-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					caption="친구들은 뭘 먹고 싶어 했을까?"
					headline="투표 결과로 확인해요"
					isDark={false}
					isInView={isInView}
				/>
				<div className="ygi:flex ygi:w-full ygi:flex-col ygi:items-center ygi:gap-2.5">
					{feature3Screens.map(({ name, direction, height }, index) => (
						<motion.div
							key={name}
							initial={{ opacity: 0, x: direction * 60 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{
								duration: 0.65,
								ease: "easeOut",
								delay: 0.3 + index * 0.2,
							}}
							className="ygi:w-full ygi:max-w-57.5"
						>
							<Image
								src={`/images/service-landing/${name}.png`}
								alt={`투표 결과 화면 ${index + 1}`}
								width={654}
								height={height}
								className="ygi:w-full ygi:shadow-lg"
								priority
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

// ── Feature4Section ──────────────────────────────────────────────────────────
const Feature4Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:overflow-hidden ygi:bg-palette-gray-700 ygi:px-6 ygi:pt-13.5"
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-300 ygi:flex-col ygi:items-center">
				<FeatureText
					caption="투표 결과에 따라"
					headline="모임에 맞게 맛집 추천해요"
					isDark={true}
					isInView={isInView}
				/>
				<div className="ygi:relative ygi:-bottom-8 ygi:flex ygi:flex-col ygi:items-center ygi:gap-4">
					{/* 투표 필터 요약 카드 - 아래에서 위로 fade + scale */}
					<motion.div
						initial={{ opacity: 0, y: 40, scale: 0.5 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
						transition={{
							duration: 0.45,
							ease: [0.25, 0.46, 0.45, 0.94],
							delay: 0.2,
						}}
						className="ygi:w-full ygi:max-w-55.25 ygi:mx-auto"
					>
						<Image
							src="/images/service-landing/feature-4-tooltip.png"
							alt="투표 결과 요약"
							width={654}
							height={247}
							className="ygi:w-full"
							priority
						/>
					</motion.div>
					{/* 맛집 추천 리스트 - bottom overflow + scale 등장 */}
					<div className="ygi:relative">
						<motion.div
							initial={{ opacity: 1, y: 80, scale: 0.88 }}
							animate={
								isInView ? { opacity: 1, y: 0, scale: 1 } : {}
							}
							transition={{
								duration: 0.75,
								ease: [0.25, 0.46, 0.45, 0.94],
								delay: 0.4,
							}}
							className="ygi:w-full ygi:max-w-65.5"
						>
							<Image
								src="/images/service-landing/feature-4-screen.png"
								alt="맛집 추천 화면"
								width={654}
								height={752}
								className="ygi:w-full  ygi:shadow-2xl"
								priority
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

// ── Speech Bubble ─────────────────────────────────────────────────────────────
interface SpeechBubbleProps {
	text: string;
	direction: "left" | "right";
	variant: "primary" | "white";
}

const SpeechBubble = ({ text, direction, variant }: SpeechBubbleProps) => {
	const isPrimary = variant === "primary";
	const bg = isPrimary ? "#FF5A3C" : "white";
	const textColor = isPrimary ? "white" : "#111827";

	// 둥글게 뾰족하게 커브진 말풍선 꼬리
	const TailLeft = () => (
		<svg
			width="7"
			height="12"
			viewBox="0 0 7 12"
			fill="none"
			aria-hidden="true"
			style={{ flexShrink: 0 }}
		>
			<path d="M7 0 C7 0 1 4.5 0 6 C1 7.5 7 12 7 12 Z" fill={bg} />
		</svg>
	);
	const TailRight = () => (
		<svg
			width="7"
			height="12"
			viewBox="0 0 7 12"
			fill="none"
			aria-hidden="true"
			style={{ flexShrink: 0 }}
		>
			<path d="M0 0 C0 0 6 4.5 7 6 C6 7.5 0 12 0 12 Z" fill={bg} />
		</svg>
	);

	return (
		<div className="ygi:flex ygi:items-center" style={{ gap: 0 }}>
			{direction === "left" && <TailLeft />}
			<div
				className="ygi:rounded-sm ygi:px-3 ygi:py-1.5 ygi:caption-12-sb"
				style={{ backgroundColor: bg, color: textColor }}
			>
				{text}
			</div>
			{direction === "right" && <TailRight />}
		</div>
	);
};

// ── Feature5Section ──────────────────────────────────────────────────────────
const Feature5Section = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:px-12.5 ygi:py-13.5"
			style={{ backgroundColor: "#d5dae2" }}
		>
			<div className="ygi:mx-auto ygi:flex ygi:max-w-300 ygi:flex-col ygi:items-center ygi:gap-10">
				<FeatureText
					caption="오래 걸리던 맛집 정하기"
					headline={"이제는 쉽고 편하게 결정해요"}
					isDark={false}
					isInView={isInView}
				/>

				{/* OG 카드 + 말풍선 컨테이너 - 각 요소 개별 순차 애니메이션 */}
				<div className="ygi:relative ygi:w-full ygi:max-w-75 ygi:pt-10 ygi:pb-14">
					{/* ① 오렌지 말풍선 - 좌→우 (delay 0.1s) */}
					<motion.div
						initial={{ opacity: 0, x: -28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.1,
						}}
						className="ygi:absolute ygi:-top-1 ygi:left-0"
					>
						<SpeechBubble
							text="얘들아 오늘은 여기다"
							direction="left"
							variant="primary"
						/>
					</motion.div>

					{/* ② OG 링크 미리보기 카드 - 좌→우 (delay 0.26s) */}
					<motion.div
						initial={{ opacity: 0, x: -28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.45,
							ease: "easeOut",
							delay: 0.26,
						}}
						className="ygi:relative ygi:h-49.5 ygi:w-full ygi:max-w-52.75"
					>
						<Image
							src="/images/service-landing/feature-5-og-card.png"
							alt="요기잇 링크 공유 미리보기"
							fill
							priority
						/>
					</motion.div>

					{/* ③ 흰 말풍선 1 - 우→좌 (delay 0.44s) */}
					<motion.div
						initial={{ opacity: 0, x: 28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.44,
						}}
						className="ygi:absolute ygi:right-0 ygi:bottom-6"
					>
						<SpeechBubble
							text="마싯겠다"
							direction="right"
							variant="white"
						/>
					</motion.div>

					{/* ④ 흰 말풍선 2 - 우→좌 (delay 0.6s) */}
					<motion.div
						initial={{ opacity: 0, x: 28 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{
							duration: 0.4,
							ease: "easeOut",
							delay: 0.6,
						}}
						className="ygi:absolute ygi:right-0 ygi:-bottom-4"
					>
						<SpeechBubble
							text="당장 고."
							direction="right"
							variant="white"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

// ── CTA Section ─────────────────────────────────────────────────────────────
const CtaSection = () => {
	const { ref, isInView } = useScrollReveal();

	return (
		<section
			ref={ref}
			className="ygi:bg-palette-gray-800 ygi:px-6 ygi:py-15.5"
		>
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:gap-10 ygi:text-center"
			>
				<p className="ygi:heading-22-bd ygi:whitespace-pre-line ygi:text-text-inverse">
					{"지금 바로 "}
					<span className="ygi:text-button-secondary">요기잇</span>
					{"으로\n맛집을 추천 받아요"}
				</p>
				<Link
					href="/gathering/create"
					className="ygi:flex ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-white ygi:px-6 ygi:py-3 ygi:heading-18-bd ygi:text-text-primary ygi:transition-colors ygi:hover:bg-white/90"
				>
					바로 시작하기
				</Link>
			</motion.div>
		</section>
	);
};

// ── Footer ───────────────────────────────────────────────────────────────────
const LandingFooter = () => (
	<footer className="ygi:bg-[#13181c] ygi:p-10">
		<div className="ygi:space-y-2.5">
			<p className="ygi:body-14-rg ygi:text-[#717D96]">
				문의:{" "}
				<a href="mailto:hereeatt@gmail.com" className="ygi:underline">
					hereeatt@gmail.com
				</a>
			</p>

			<p className="ygi:flex ygi:gap-4 ygi:body-14-rg ygi:text-[#717D96] ygi:transition-colors">
				<a
					href="#" // TODO: 이용약관 링크 추가
					className=" ygi:hover:text-white"
				>
					이용약관
				</a>
				<a
					href="#" // TODO: 개인정보 처리 방침 링크 추가
					className="ygi:hover:text-white"
				>
					개인정보 처리 방침
				</a>
			</p>

			<p className="ygi:body-14-rg ygi:text-[#717D96]">
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
			<main className="ygi:pt-16.25">
				<HeroSection />
				<PainPointSection />
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
