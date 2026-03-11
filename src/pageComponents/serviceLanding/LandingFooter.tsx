export const LandingFooter = () => (
	<footer className="ygi:bg-[#13181c] ygi:p-10">
		<div className="ygi:space-y-2.5">
			<p className="ygi:body-14-rg ygi:text-[#717D96]">
				문의:{" "}
				<a href="mailto:hereeatt@gmail.com" className="ygi:underline">
					hereeatt@gmail.com
				</a>
			</p>

			<p className="ygi:flex ygi:gap-4 ygi:body-14-rg ygi:text-[#717D96] ygi:transition-colors">
				<a
					href="#" // TODO: 이용약관 링크 추가
					className=" ygi:hover:text-white"
				>
					이용약관
				</a>
				<a
					href="#" // TODO: 개인정보 처리 방침 링크 추가
					className="ygi:hover:text-white"
				>
					개인정보 처리 방침
				</a>
			</p>

			<p className="ygi:body-14-rg ygi:text-[#717D96]">
				© 2026 Team Yogieat. All rights reserved.
			</p>
		</div>
	</footer>
);
