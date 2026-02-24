"use client";

import { Button } from "#/components/button";
import { NotFoundIllustration } from "#/components/illustrations";

interface GlobalErrorPageProps {
	reset: () => void;
}

export default function GlobalErrorPage({ reset }: GlobalErrorPageProps) {
	return (
		<html lang="ko">
			<body>
				<div className="ygi:relative ygi:mx-auto ygi:min-h-screen-dynamic ygi:w-full ygi:max-w-root-layout ygi:shadow-drop">
					<main className="ygi:relative ygi:h-dvh ygi:bg-bg-white">
						<div className="ygi:flex ygi:h-full ygi:flex-col ygi:items-center ygi:justify-center ygi:px-6">
							<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-10">
								<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-2 ygi:text-center">
									<p className="ygi:body-16-md ygi:text-text-secondary">
										문제가 발생했어요
									</p>
									<h1 className="ygi:heading-22-bd ygi:text-text-primary">
										다시 시도해 주세요
									</h1>
								</div>

								<NotFoundIllustration />

								<Button onClick={reset}>다시 시도</Button>
							</div>
						</div>
					</main>
				</div>
			</body>
		</html>
	);
}
