"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";

import { trackCtaClick, trackPageView } from "#/components/analytics";
import { Layout } from "#/components/layout";

const PAGE_ID = "모임생성_랜딩";

export const LandingPage = () => {
	const router = useRouter();

	const handleStartClick = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "모임 링크 생성 시작" });
		router.replace("/gathering/create");
	};

	useEffect(() => {
		trackPageView("view_landing", { page_id: PAGE_ID });
	}, []);

	return (
		<Layout.Root>
			<div className="ygi:relative ygi:min-h-screen-dynamic ygi:w-full ygi:overflow-hidden ygi:bg-button-secondary">
				{/* Header Section */}
				<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-5 ygi:px-6 ygi:pt-20">
					<p className="ygi:text-center ygi:heading-22-bd ygi:text-text-inverse">
						다인원을 위한 맛집 서비스
					</p>
					<Image
						src="/images/landing/logo.svg"
						alt="요기잇"
						width={184}
						height={58}
						priority
					/>
				</div>

				{/* Illustration Section */}
				<div className="ygi:relative ygi:mx-auto ygi:mt-10 ygi:h-82 ygi:max-w-93.75">
					{/* Green Sushi Card */}
					<div className="ygi:absolute ygi:top-9.5 ygi:-left-10">
						<div className="ygi:relative ygi:flex ygi:h-62.75 ygi:w-62.75 ygi:items-center ygi:justify-center">
							<div className="ygi:h-44.5 ygi:w-44.5 ygi:rotate-45 ygi:rounded-lg ygi:border-[6px] ygi:border-palette-common-white ygi:bg-palette-green-700" />
							<div className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center">
								<Image
									src="/images/landing/sushi-1.svg"
									alt=""
									width={84}
									height={61}
									className="ygi:absolute ygi:top-21.25 ygi:left-15.25"
									priority
								/>
								<Image
									src="/images/landing/sushi-2.svg"
									alt=""
									width={93}
									height={68}
									className="ygi:absolute ygi:top-25 ygi:left-24.25"
									priority
								/>
							</div>
						</div>
					</div>

					{/* Blue Soup Card */}
					<div className="ygi:absolute ygi:top-10.5 ygi:-right-10">
						<div className="ygi:relative ygi:flex ygi:h-62.5 ygi:w-60.5 ygi:items-center ygi:justify-center">
							<Image
								src="/images/landing/card-blue.svg"
								alt=""
								width={195}
								height={207}
								className="ygi:rotate-15"
								priority
							/>
							<div className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center">
								<Image
									src="/images/landing/soup.svg"
									alt=""
									width={134}
									height={145}
									className="ygi:rotate-15"
									priority
								/>
							</div>
						</div>
						{/* Hand icons - animated to point between cards */}
						<motion.div
							className="ygi:absolute ygi:right-22.75 ygi:-bottom-px ygi:z-1"
							animate={{
								x: [0, -180, -180, 0],
								rotate: [2.72, 20, 20, 2.72],
							}}
							transition={{
								duration: 1.5,
								ease: "easeInOut",
								times: [0, 0.4, 0.6, 1],
							}}
						>
							<Image
								src="/images/landing/hand-1.svg"
								alt=""
								width={82}
								height={67}
								priority
							/>
						</motion.div>
						<motion.div
							className="ygi:absolute ygi:right-18.75 ygi:-bottom-4.25 ygi:z-1"
							animate={{
								x: [0, -180, -180, 0],
								rotate: [2.72, 20, 20, 2.72],
							}}
							transition={{
								duration: 1.5,
								ease: "easeInOut",
								times: [0, 0.4, 0.6, 1],
							}}
						>
							<Image
								src="/images/landing/hand-2.svg"
								alt=""
								width={58}
								height={58}
								priority
							/>
						</motion.div>
					</div>

					{/* Heart Icons */}
					<Image
						src="/images/landing/heart-4.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:top-3 ygi:left-46.25"
						priority
					/>
					<Image
						src="/images/landing/heart-1.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:top-14.25 ygi:left-55.25 ygi:rotate-[-21.93deg]"
						priority
					/>
					<Image
						src="/images/landing/heart-3.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:top-10.75 ygi:left-64.75 ygi:rotate-[14.45deg]"
						priority
					/>
					<Image
						src="/images/landing/heart-2.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:top-52.25 ygi:left-28.25 ygi:rotate-[30.45deg]"
						priority
					/>
				</div>

				{/* CTA Button */}
				<div className="ygi:absolute ygi:right-0 ygi:bottom-15 ygi:left-0 ygi:flex ygi:justify-center ygi:px-6">
					<button
						type="button"
						className="ygi:inline-flex ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-surface-white ygi:px-6 ygi:py-3 ygi:heading-18-bd ygi:text-text-primary ygi:transition-colors ygi:hover:bg-palette-gray-50"
						onClick={handleStartClick}
					>
						모임 링크 생성 시작
					</button>
				</div>
			</div>
		</Layout.Root>
	);
};
