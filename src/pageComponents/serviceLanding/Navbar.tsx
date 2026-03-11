"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";
import Link from "next/link";

import { LandingLogoIcon } from "#/icons/landingLogoIcon";

export const Navbar = () => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const sentinel = document.getElementById("hero-sentinel");
		const onScroll = () => {
			if (sentinel) {
				setVisible(sentinel.getBoundingClientRect().top < 0);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.header
			className="ygi:fixed ygi:top-0 ygi:right-0 ygi:left-0 ygi:z-50 ygi:bg-white ygi:shadow-sm"
			initial={{ opacity: 0 }}
			animate={visible ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.5, ease: "easeInOut" }}
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
		</motion.header>
	);
};
