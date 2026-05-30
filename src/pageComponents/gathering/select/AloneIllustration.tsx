import Image from "next/image";

export const AloneIllustration = () => (
	<div className="ygi:relative ygi:size-24 ygi:overflow-hidden ygi:rounded-full ygi:bg-[#dbdde3]">
		<Image
			src="/images/select/alone-person.svg"
			alt=""
			width={68}
			height={73}
			className="ygi:absolute"
			style={{
				left: "14.02px",
				top: "16.12px",
				width: "67.92px",
				height: "72.67px",
			}}
		/>
		<Image
			src="/images/select/alone-ground.svg"
			alt=""
			width={113}
			height={47}
			className="ygi:absolute"
			style={{
				left: "-8.02px",
				top: "64px",
				width: "112.55px",
				height: "46.53px",
			}}
		/>
	</div>
);
