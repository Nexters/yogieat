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
					href="https://lime-salto-42a.notion.site/321b5a0dc75b80808570cb6e5512904b"
					target="_blank"
					rel="noopener noreferrer"
					className="ygi:hover:text-white"
				>
					이용약관
				</a>
				<a
					href="https://lime-salto-42a.notion.site/321b5a0dc75b80f38beef7a440acaa03"
					target="_blank"
					rel="noopener noreferrer"
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
