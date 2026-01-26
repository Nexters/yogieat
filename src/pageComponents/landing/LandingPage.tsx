"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Layout } from "#/components/layout";

export const LandingPage = () => {
	const router = useRouter();

	const handleStartClick = () => {
		router.push("/gathering/create");
	};

	return (
		<Layout.Root>
			<div className="ygi:relative ygi:min-h-screen-dynamic ygi:w-full ygi:bg-button-secondary ygi:overflow-hidden">
				{/* Header Section */}
				<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-5 ygi:pt-20 ygi:px-6">
					<p className="ygi:heading-22-bd ygi:text-text-inverse ygi:text-center">
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
				<div className="ygi:relative ygi:h-82 ygi:max-w-93.75 ygi:mx-auto ygi:mt-10">
					{/* Green Sushi Card */}
					<div className="ygi:absolute ygi:-left-10 ygi:top-9.5">
						<div className="ygi:relative ygi:w-62.75 ygi:h-62.75 ygi:flex ygi:items-center ygi:justify-center">
							<div className="ygi:w-44.5 ygi:h-44.5 ygi:bg-palette-green-700 ygi:rounded-lg ygi:border-[6px] ygi:border-palette-common-white ygi:rotate-45" />
							<div className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center">
								<Image
									src="/images/landing/sushi-1.svg"
									alt=""
									width={84}
									height={61}
									className="ygi:absolute ygi:left-15.25 ygi:top-21.25"
								/>
								<Image
									src="/images/landing/sushi-2.svg"
									alt=""
									width={93}
									height={68}
									className="ygi:absolute ygi:left-24.25 ygi:top-25"
								/>
							</div>
						</div>
					</div>

					{/* Blue Soup Card */}
					<div className="ygi:absolute ygi:-right-10 ygi:top-10.5">
						<div className="ygi:relative ygi:w-60.5 ygi:h-62.5 ygi:flex ygi:items-center ygi:justify-center">
							<Image
								src="/images/landing/card-blue.svg"
								alt=""
								width={195}
								height={207}
								className="ygi:rotate-15"
							/>
							<div className="ygi:absolute ygi:inset-0 ygi:flex ygi:items-center ygi:justify-center">
								<Image
									src="/images/landing/soup.svg"
									alt=""
									width={134}
									height={145}
									className="ygi:rotate-15"
								/>
							</div>
						</div>
						{/* Hand icons - positioned together as one unit */}
						<div className="ygi:absolute ygi:right-22.75 ygi:-bottom-4.25">
							<Image
								src="/images/landing/hand-1.svg"
								alt=""
								width={82}
								height={67}
								className="ygi:rotate-[2.72deg]"
							/>
						</div>
						<div className="ygi:absolute ygi:right-18.75 ygi:-bottom-8.5">
							<Image
								src="/images/landing/hand-2.svg"
								alt=""
								width={58}
								height={58}
								className="ygi:rotate-[2.72deg]"
							/>
						</div>
					</div>

					{/* Heart Icons */}
					<Image
						src="/images/landing/heart-4.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-46.25 ygi:top-3"
					/>
					<Image
						src="/images/landing/heart-1.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-55.25 ygi:top-14.25 ygi:rotate-[-21.93deg]"
					/>
					<Image
						src="/images/landing/heart-3.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-64.75 ygi:top-10.75 ygi:rotate-[14.45deg]"
					/>
					<Image
						src="/images/landing/heart-2.svg"
						alt=""
						width={48}
						height={48}
						className="ygi:absolute ygi:left-28.25 ygi:top-52.25 ygi:rotate-[30.45deg]"
					/>
				</div>

				{/* CTA Button */}
				<div className="ygi:absolute ygi:bottom-15 ygi:left-0 ygi:right-0 ygi:flex ygi:justify-center ygi:px-6">
					<button
						type="button"
						className="ygi:inline-flex ygi:items-center ygi:justify-center ygi:px-6 ygi:py-3 ygi:bg-surface-white ygi:text-text-primary ygi:heading-18-bd ygi:rounded-full ygi:cursor-pointer ygi:transition-colors ygi:hover:bg-palette-gray-50"
						onClick={handleStartClick}
					>
						모임 링크 생성 시작
					</button>
				</div>
			</div>
		</Layout.Root>
	);
};
