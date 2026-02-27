"use client";

import { Layout } from "#/components/layout";
import { ResultGeneratingIllustration } from "#/components/illustrations";
import { ResultGeneratingSpeechBubble } from "./ResultGeneratingSpeechBubble";

export const ResultGeneratingPage = () => {
	return (
		<Layout.Content background="gray">
			<div className="ygi:flex ygi:h-full ygi:flex-col ygi:items-center ygi:justify-center ygi:gap-8 ygi:px-6 ygi:text-center">
				<div className="ygi:flex ygi:flex-col ygi:gap-2">
					<p className="ygi:body-16-md ygi:text-text-secondary">
						두구두구두구
					</p>
					<h1 className="ygi:heading-22-bd ygi:text-text-primary">
						추천 결과는...!
					</h1>
				</div>

				<div className="ygi:relative ygi:w-full">
					<ResultGeneratingIllustration />
					<div className="ygi:absolute ygi:top-0 ygi:left-1/2 ygi:-translate-x-1/2 ygi:-translate-y-1/2">
						<ResultGeneratingSpeechBubble />
					</div>
				</div>
			</div>
		</Layout.Content>
	);
};
