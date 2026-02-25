"use client";

import { motion } from "motion/react";

export const ResultGeneratingIllustration = () => {
	return (
		<div className="ygi:flex ygi:h-64.5 ygi:w-full ygi:items-center ygi:justify-center">
			<svg
				width="375"
				height="258"
				viewBox="0 0 375 258"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Shadow */}
				<ellipse
					cx="187.5"
					cy="179.154"
					rx="58.5859"
					ry="25.1099"
					fill="url(#paint0_linear_1865_35373)"
				/>

				{/* Bowl Bottom */}
				<path
					d="M256.889 93.3672C256.465 101.288 252.257 108.624 245.374 114.819C232.954 125.995 211.717 133.388 187.5 133.388C163.283 133.388 142.046 125.995 129.626 114.819C122.747 108.624 118.535 101.288 118.111 93.3672C118.042 93.1832 118 93.0699 118 93.0699V111.365C118 150.787 149.114 182.749 187.5 182.749C225.886 182.749 257 150.791 257 111.365V93.0699C257 93.0699 256.958 93.1879 256.889 93.3672Z"
					fill="url(#paint1_linear_1865_35373)"
				/>

				{/* Bowl Top - Inner */}
				<path
					d="M187.5 56.4092C206.312 56.4092 223.212 60.7837 235.315 67.7188C247.493 74.6962 254.327 83.9303 254.327 93.5566C254.327 103.183 247.493 112.418 235.315 119.396C223.212 126.331 206.312 130.705 187.5 130.705C168.688 130.705 151.788 126.331 139.685 119.396C127.507 112.418 120.673 103.183 120.673 93.5566C120.673 83.9303 127.507 74.6962 139.685 67.7188C151.788 60.7837 168.688 56.4092 187.5 56.4092Z"
					fill="url(#paint2_linear_1865_35373)"
					stroke="#7FC3FF"
					strokeWidth="5.34615"
					strokeLinecap="round"
				/>

				{/* Bowl Top - Outer */}
				<path
					d="M187.5 56.4092C206.312 56.4092 223.212 60.7837 235.315 67.7188C247.493 74.6962 254.327 83.9303 254.327 93.5566C254.327 103.183 247.493 112.418 235.315 119.396C223.212 126.331 206.312 130.705 187.5 130.705C168.688 130.705 151.788 126.331 139.685 119.396C127.507 112.418 120.673 103.183 120.673 93.5566C120.673 83.9303 127.507 74.6962 139.685 67.7188C151.788 60.7837 168.688 56.4092 187.5 56.4092Z"
					stroke="#ADD9FF"
					strokeWidth="5.34615"
					strokeLinecap="round"
				/>

				{/* Left Chopstick */}
				<motion.g
					style={{ originX: "162px", originY: "186px" }}
					animate={{
						rotate: [0, -8, 0],
					}}
					transition={{
						duration: 0.4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<path
						d="M177.478 87.8644C178.537 88.1337 179.184 89.2029 178.931 90.2658L155.766 187.59L148.29 185.688L174.223 89.073C174.507 88.0161 175.587 87.3834 176.648 87.6532L177.478 87.8644Z"
						fill="url(#paint3_linear_1865_35373)"
					/>
					<path
						d="M153.921 195.343C153.663 196.43 152.565 197.094 151.483 196.818L147.662 195.847C146.581 195.572 145.934 194.467 146.223 193.39L148.291 185.688L155.767 187.59L153.921 195.343Z"
						fill="#1F2933"
					/>
				</motion.g>

				{/* Right Chopstick */}
				<motion.g
					style={{ originX: "219px", originY: "202px" }}
					animate={{
						rotate: [0, 10, 0],
					}}
					transition={{
						duration: 0.4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<path
						d="M200.325 103.101C199.252 103.305 198.54 104.333 198.728 105.409L215.876 203.971L223.455 202.532L203.5 104.507C203.281 103.435 202.242 102.737 201.167 102.941L200.325 103.101Z"
						fill="url(#paint4_linear_1865_35373)"
					/>
					<path
						d="M217.242 211.823C217.433 212.923 218.489 213.654 219.586 213.445L223.459 212.71C224.554 212.502 225.268 211.438 225.045 210.346L223.455 202.532L215.876 203.971L217.242 211.823Z"
						fill="#1F2933"
					/>
				</motion.g>

				<defs>
					<linearGradient
						id="paint0_linear_1865_35373"
						x1="188"
						y1="171.5"
						x2="187.5"
						y2="204.264"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#E5E7EB" />
						<stop offset="1" stopColor="#F3F4F6" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_1865_35373"
						x1="187.5"
						y1="93.0699"
						x2="187.5"
						y2="182.749"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#66B9FF" />
						<stop offset="1" stopColor="#ADD9FF" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_1865_35373"
						x1="187.5"
						y1="53.7363"
						x2="187.5"
						y2="133.378"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#7FC3FF" />
						<stop offset="1" stopColor="#53B7FF" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_1865_35373"
						x1="177.06"
						y1="87.7582"
						x2="149.452"
						y2="196.302"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#FF5A3C" />
						<stop offset="1" stopColor="#FF7F6B" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_1865_35373"
						x1="200.748"
						y1="103.021"
						x2="221.644"
						y2="213.054"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#FF5A3C" />
						<stop offset="1" stopColor="#FF7F6B" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	);
};
