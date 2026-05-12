export const MeetingCompleteIllustration = ({
	className,
}: {
	className?: string;
}) => {
	return (
		<svg
			width="295"
			height="336"
			viewBox="0 -16 295 336"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<defs>
				<clipPath id="clip0_bowl">
					<rect
						width="10"
						height="100"
						fill="white"
						transform="translate(14.7932 4.96464) rotate(-29.7663)"
					/>
				</clipPath>
				<clipPath id="clip1_bowl">
					<rect
						width="10"
						height="100"
						fill="white"
						transform="translate(3.50853 11.4187) rotate(-29.7663)"
					/>
				</clipPath>
			</defs>

			{/* Card background */}
			<rect width="295" height="320" rx="24" fill="#F3F4F6" />

			{/* Orange header band */}
			<path
				d="M0 24C0 10.7452 10.7452 0 24 0H271C284.255 0 295 10.7452 295 24V60H0V24Z"
				fill="#FF5A3C"
			/>

			{/* Three pins */}
			<rect x="30" y="-16" width="14" height="32" rx="7" fill="#111827" />
			<rect x="59" y="-16" width="14" height="32" rx="7" fill="#111827" />
			<rect x="88" y="-16" width="14" height="32" rx="7" fill="#111827" />

			{/* Bowl with chopsticks - positioned at left:74, top:84, container 166x192 */}
			<g transform="translate(74, 126)">
				{/* Chopstick 1 */}
				<g clipPath="url(#clip0_bowl)">
					<path
						d="M14.7932 4.96464L23.4738 0L71.3841 87.7987L66.1757 90.7774L14.7932 4.96464Z"
						fill="#FF5A3C"
					/>
					<rect
						width="14"
						height="5"
						transform="translate(13.0571 5.95757) rotate(-29.7663)"
						fill="#1F2933"
					/>
				</g>
				{/* Chopstick 2 */}
				<g clipPath="url(#clip1_bowl)">
					<path
						d="M3.50853 11.4187L12.1891 6.45404L60.0994 94.2527L54.891 97.2315L3.50853 11.4187Z"
						fill="#FF5A3C"
					/>
					<rect
						width="14"
						height="5"
						transform="translate(1.77242 12.4116) rotate(-29.7663)"
						fill="#1F2933"
					/>
				</g>
				{/* Bowl base */}
				<path
					d="M56.0337 129.779H94.4616V143.248C94.4616 146.974 91.3951 150 87.618 150H62.8814C59.1043 150 56.0378 146.974 56.0378 143.248L56.0337 129.779Z"
					fill="#9CA3AF"
				/>
				{/* Bowl body */}
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M143.682 65.3236C147.659 65.3236 150.848 68.6959 150.464 72.6039C146.757 110.371 114.494 139.891 75.2457 139.891C35.9971 139.891 3.73901 110.371 0.0313715 72.6039C-0.352459 68.6999 2.8366 65.3236 6.81373 65.3236H143.682Z"
					fill="#E5E7EB"
				/>
			</g>

			{/* Spoon group - positioned at left:141.51 (74+67.51), top:84 */}
			<g transform="translate(141.51, 84)">
				<path
					d="M48.8956 60.6478C48.7429 57.0204 50.3274 53.7111 52.8447 51.3641L55.0164 49.4452L87.1219 20.161C88.8808 18.5198 88.784 15.605 86.9124 13.704L84.4015 11.1932C82.5005 9.31919 79.5858 9.22482 77.9446 10.9837L48.6604 43.0892L46.7415 45.2609C44.3944 47.7782 41.0852 49.3627 37.4578 49.21C31.3472 48.952 25.6629 49.2482 17.2126 56.2876C8.76223 63.3271 1.14404 74.4418 7.68786 80.8954C14.1389 87.4367 32.7562 89.8021 41.8205 80.8955C47.5674 75.2462 49.1537 66.7607 48.8981 60.6503L48.8956 60.6478Z"
					fill="#7FC3FF"
				/>
				<path
					d="M48.9105 57.6995C42.3776 72.3985 24.8528 83.8889 9.33725 82.2557C15.3161 86.3502 26.862 89.5473 38.2946 83.831C51.6447 77.156 51.0881 63.9602 48.9105 57.6995Z"
					fill="#53B7FF"
				/>
			</g>
		</svg>
	);
};
