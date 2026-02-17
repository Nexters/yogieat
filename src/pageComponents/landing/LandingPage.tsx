"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Player = dynamic(
	() =>
		import("@lottiefiles/react-lottie-player").then((module) => module.Player),
	{
		ssr: false,
		loading: () => <div className="ygi:h-82 ygi:w-full" />,
	},
);

import { trackCtaClick, trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";

const PAGE_ID = "모임생성_랜딩";

export const LandingPage = () => {
	const router = useRouter();

	const handleStartClick = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "모임 링크 생성 시작" });
		router.replace("/gathering/create");
	};

	useEffect(() => {
		trackViewPage({
			page_id: PAGE_ID,
		});
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
				<div className="ygi:mx-auto ygi:mt-19.5 ygi:aspect-421/266">
					<Player
						autoplay
						loop
						src="/lotties/create-landing.json"
						style={{ width: "100%", height: "100%" }}
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
