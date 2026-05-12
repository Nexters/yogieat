"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { LandingLogoIcon } from "#/icons/landingLogoIcon";

const Player = dynamic(
	() =>
		import("@lottiefiles/react-lottie-player").then(
			(module) => module.Player,
		),
	{ ssr: false },
);

export const HeroSection = () => {
	return (
		<section className="ygi:overflow-hidden ygi:bg-palette-primary-500 ygi:pt-25">
			<div className="ygi:mx-auto ygi:flex ygi:flex-col ygi:items-center ygi:gap-6">
				{/* Text block */}
				<div className="ygi:flex ygi:flex-col ygi:items-center ygi:text-center">
					<div className="ygi:mb-6">
						<Image
							src="/images/landing/subtitle.svg"
							alt="다인원을 위한 맛집 추천 서비스"
							width={246}
							height={17}
							priority
						/>
					</div>

					<div className="ygi:mb-15">
						<LandingLogoIcon
							color="white"
							width={170}
							height={52}
							aria-label="요기잇"
						/>
					</div>

					<Link
						href="/gathering/create"
						className="ygi:inline-flex ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-white ygi:px-8 ygi:py-4 ygi:heading-18-bd ygi:text-text-primary ygi:transition-colors ygi:hover:bg-white/90"
					>
						바로 시작하기
					</Link>
				</div>

				{/* Characters - Lottie */}
				<div className="ygi:relative ygi:-bottom-8 ygi:min-h-66.5 ygi:min-w-105.25">
					<motion.div
						initial={{ opacity: 0, translateY: 30, scale: 0.9 }}
						animate={{ opacity: 1, translateY: 0, scale: 1 }}
						transition={{
							duration: 0.3,
							delay: 0.3,
							ease: "easeOut",
						}}
					>
						<Player
							autoplay
							loop
							src="/lotties/create-landing.json"
							style={{ width: "100%", height: "100%" }}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
