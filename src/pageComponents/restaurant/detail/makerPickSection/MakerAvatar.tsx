/* ============================================================
   요기잇 메이커 아바타 (인라인 벡터)
   - variant 에 따라 배경 / 옷 / 옷깃 색만 교체된다.
   - 얼굴 / 머리 / 손 등 톤은 고정.
   ============================================================ */

export type MakerAvatarVariant = "coral" | "blue" | "green";

interface AvatarColors {
	/** 배경 원형 색 */
	background: string;
	/** 상의(옷) 색 */
	clothing: string;
	/** 옷깃/반다나 색 */
	collar: string;
}

const avatarVariants: Record<MakerAvatarVariant, AvatarColors> = {
	// 디자인 원본
	coral: {
		background: "var(--ygi-color-palette-primary-100)",
		clothing: "var(--ygi-color-palette-primary-300)",
		collar: "var(--ygi-color-palette-secondary-700)",
	},
	blue: {
		background: "var(--ygi-color-palette-secondary-100)",
		clothing: "var(--ygi-color-palette-secondary-500)",
		collar: "var(--ygi-color-palette-primary-300)",
	},
	green: {
		background: "var(--ygi-color-palette-green-100)",
		clothing: "var(--ygi-color-palette-green-500)",
		collar: "var(--ygi-color-palette-yellow-700)",
	},
};

const avatarVariantKeys = Object.keys(avatarVariants) as MakerAvatarVariant[];

/**
 * restaurantId 기반 결정적(deterministic) variant 선택.
 * - 식당마다 색이 달라 "랜덤"하게 노출되지만, 같은 식당은 항상 같은 색.
 * - Math.random() 을 쓰지 않는 이유: SSR↔CSR hydration 불일치 + 리렌더마다 색 깜빡임 방지.
 */
export const pickVariant = (seed: number): MakerAvatarVariant => {
	const index = Math.abs(Math.trunc(seed)) % avatarVariantKeys.length;
	return avatarVariantKeys[index];
};

interface MakerAvatarProps {
	variant?: MakerAvatarVariant;
	size?: number;
}

export const MakerAvatar = ({
	variant = "coral",
	size = 32,
}: MakerAvatarProps) => {
	const { background, clothing, collar } = avatarVariants[variant];

	return (
		<span
			className="ygi:relative ygi:block ygi:shrink-0 ygi:overflow-hidden ygi:rounded-full"
			style={{ width: size, height: size, backgroundColor: background }}
			aria-hidden
		>
			{/* 캐릭터 벡터: 원형(32) 안에 머리·어깨가 보이도록 오프셋 배치 */}
			<svg
				width="37.9063"
				height="40.5552"
				viewBox="0 0 37.9063 40.5552"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: "absolute",
					left: (-2.87 / 32) * size,
					top: (6.01 / 32) * size,
					width: (37.9063 / 32) * size,
					height: (40.5552 / 32) * size,
				}}
			>
				{/* 머리(뒤) */}
				<path
					d="M26.6032 5.63458C25.7032 3.25887 23.4276 1.6875 20.8871 1.6875H17.132C14.5915 1.6875 12.3159 3.25887 11.4159 5.63458L8.36666 13.6835C7.60914 15.6831 9.08644 17.8225 11.2247 17.8225H26.7944C28.9327 17.8225 30.41 15.6831 29.6525 13.6835L26.6032 5.63458Z"
					fill="#514B46"
				/>
				<path
					d="M9.44983 9.56C9.44983 14.8398 13.73 17.8226 19.0098 17.8226C24.2897 17.8226 28.5698 14.8398 28.5698 9.56C28.5698 4.28016 24.2897 0 19.0098 0C13.73 0 9.44983 4.28016 9.44983 9.56Z"
					fill="#514B46"
				/>
				{/* 귀 */}
				<circle
					cx="3.61156"
					cy="3.61156"
					r="3.61156"
					transform="matrix(-1 0 0 1 30.2696 6.16089)"
					fill="#FFE5CF"
				/>
				<circle
					cx="3.61156"
					cy="3.61156"
					r="3.61156"
					transform="matrix(-1 0 0 1 14.1234 6.16089)"
					fill="#FFE5CF"
				/>
				{/* 상의(옷) */}
				<path
					d="M23.7128 19.12H14.3073C14.3073 19.12 12.52 26.0088 12.25 29.266C12.0742 31.388 12.8797 33.3416 13.4625 34.4456C13.7829 35.0524 14.4296 35.3834 15.1158 35.3834H22.9044C23.5906 35.3834 24.2373 35.0524 24.5577 34.4456C25.1405 33.3416 25.946 31.388 25.7701 29.266C25.5002 26.0088 23.7128 19.12 23.7128 19.12Z"
					fill={clothing}
				/>
				{/* 목 */}
				<rect
					width="4.05532"
					height="6.43951"
					rx="2.02766"
					transform="matrix(-1 0 0 1 21.0375 14.6154)"
					fill="#FFDDC0"
				/>
				{/* 얼굴 */}
				<circle
					cx="8.49778"
					cy="8.49778"
					r="8.49778"
					transform="matrix(-1 0 0 1 27.5073 1.06222)"
					fill="#FFE8D5"
				/>
				{/* 볼 */}
				<rect
					width="3.48411"
					height="4.04642"
					rx="1.74206"
					transform="matrix(-1 0 0 1 20.7518 6.55734)"
					fill="#FFA7A3"
				/>
				{/* 입 */}
				<path
					d="M19.0096 8.24386C18.2447 8.24403 17.5971 8.73788 17.3631 9.42355C17.597 10.1094 18.2445 10.6031 19.0096 10.6032C19.7749 10.6032 20.4241 10.1097 20.658 9.42355C20.424 8.73758 19.7748 8.24386 19.0096 8.24386Z"
					fill="#FF8D87"
				/>
				{/* 눈 하이라이트 */}
				<circle
					cx="1.76755"
					cy="1.76755"
					r="1.76755"
					transform="matrix(-1 0 0 1 15.7607 6.45068)"
					fill="#FFDED5"
				/>
				<circle
					cx="1.76755"
					cy="1.76755"
					r="1.76755"
					transform="matrix(-1 0 0 1 25.5961 6.45068)"
					fill="#FFDED5"
				/>
				{/* 눈/눈썹 */}
				<path
					d="M22.9692 5.5108C22.9692 5.5108 22.4648 6.04714 21.6233 5.92887C20.7818 5.81061 20.4447 5.156 20.4447 5.156"
					stroke="#33353B"
					strokeWidth="0.637333"
					strokeLinecap="round"
				/>
				<path
					d="M17.5744 5.15599C17.5744 5.15599 17.2374 5.8106 16.3959 5.92886C15.5544 6.04713 15.0499 5.51079 15.0499 5.51079"
					stroke="#33353B"
					strokeWidth="0.637333"
					strokeLinecap="round"
				/>
				{/* 옷깃/반다나 */}
				<path
					d="M27.2757 37.1545C29.3051 37.5191 31.1703 35.9592 31.1703 33.8972C31.1703 32.2291 29.9288 30.8217 28.2737 30.6136L20.8201 29.6763C19.8403 29.5531 18.849 29.5531 17.8692 29.6763L10.4156 30.6136C8.76048 30.8217 7.51901 32.2291 7.51901 33.8972C7.51901 35.9592 9.38417 37.5191 11.4136 37.1545L17.7999 36.0072C18.8216 35.8237 19.8677 35.8237 20.8894 36.0072L27.2757 37.1545Z"
					fill={collar}
				/>
				{/* 손 */}
				<rect
					width="6.87633"
					height="9.70181"
					rx="3.43816"
					transform="matrix(-0.798885 -0.601484 -0.601484 0.798885 36.2105 31.7688)"
					fill="#FFE8D5"
				/>
				<rect
					x="2.52073"
					y="31.7629"
					width="6.87633"
					height="9.70914"
					rx="3.43816"
					transform="rotate(-36.9762 2.52073 31.7629)"
					fill="#FFE8D5"
				/>
				{/* 팔 */}
				<rect
					width="4.05532"
					height="14.7918"
					rx="2.02766"
					transform="matrix(-0.943213 0.33219 0.33219 0.943213 15.398 18.5737)"
					fill="#FFE8D5"
				/>
				<rect
					x="22.5994"
					y="18.5737"
					width="4.05532"
					height="14.9419"
					rx="2.02766"
					transform="rotate(19.4017 22.5994 18.5737)"
					fill="#FFE8D5"
				/>
				{/* 소매(옷) */}
				<path
					d="M16.0715 20.4862C15.6995 19.43 14.5417 18.8753 13.4854 19.2473C12.4292 19.6193 11.8745 20.7771 12.2465 21.8334L13.0203 24.0306L16.8454 22.6834L16.0715 20.4862Z"
					fill={clothing}
				/>
				<path
					d="M21.9258 20.4862C22.2978 19.43 23.4557 18.8753 24.5119 19.2473C25.5682 19.6193 26.1229 20.7771 25.7509 21.8334L24.977 24.0306L21.152 22.6834L21.9258 20.4862Z"
					fill={clothing}
				/>
				{/* 모자(앞) */}
				<path
					d="M21.1941 0.746059C21.0582 0.746121 20.9464 0.833961 20.9055 0.952298C20.8643 0.8323 20.7506 0.746059 20.6166 0.746059H17.4027C17.2728 0.746105 17.1621 0.827409 17.118 0.941851C17.0743 0.82873 16.9646 0.746059 16.8327 0.746059H15.6484C15.5625 0.746063 15.4806 0.782281 15.4227 0.845746L11.8459 4.70758L16.333 4.09632C16.4806 4.09628 16.6071 3.99052 16.6336 3.84531L17.0971 2.22137V3.79069C17.0972 3.9594 17.234 4.09626 17.4027 4.09632H20.6166C20.7854 4.09632 20.9222 3.95944 20.9222 3.79069V2.18048L21.3932 3.84531C21.4197 3.99055 21.5464 4.09632 21.6941 4.09632L26.1809 4.70758L22.6044 0.845746C22.5465 0.782267 22.4644 0.746059 22.3784 0.746059H21.1941Z"
					fill="#514B46"
				/>
			</svg>
		</span>
	);
};
