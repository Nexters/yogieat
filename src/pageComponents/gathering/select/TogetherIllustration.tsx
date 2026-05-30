import Image from "next/image";

export const TogetherIllustration = () => (
	<div className="ygi:relative ygi:size-24 ygi:overflow-hidden ygi:rounded-full ygi:bg-[#dbdde3]">
		<Image
			src="/images/select/group-person-left.svg"
			alt=""
			width={48}
			height={52}
			className="ygi:absolute"
			style={{
				left: "23.73px",
				top: "28.36px",
				width: "48.31px",
				height: "51.68px",
			}}
		/>
		<Image
			src="/images/select/group-person-right.svg"
			alt=""
			width={48}
			height={52}
			className="ygi:absolute"
			style={{
				left: "55.58px",
				top: "32.84px",
				width: "48.31px",
				height: "51.68px",
			}}
		/>
		<Image
			src="/images/select/group-person-center.svg"
			alt=""
			width={48}
			height={53}
			className="ygi:absolute"
			style={{
				left: "-7.91px",
				top: "31.14px",
				width: "48.31px",
				height: "53.17px",
			}}
		/>
		<Image
			src="/images/select/group-ground.svg"
			alt=""
			width={112}
			height={44}
			className="ygi:absolute"
			style={{
				left: "-7.91px",
				top: "64.36px",
				width: "112.28px",
				height: "43.59px",
			}}
		/>
	</div>
);
