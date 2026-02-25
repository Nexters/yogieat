"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { useGetGathering } from "#/hooks/apis/gathering";
import { LogoIcon } from "#/icons/logoIcon";
import { LandingIntroLottie } from "./LandingIntroLottie";
import { GatheringDateBadge } from "./GatheringDateBadge";
import { OpinionStartButton } from "./OpinionStartButton";

const PAGE_ID = "의견수합_랜딩";

export function LandingPage() {
	const { accessKey } = useParams<{ accessKey: string }>();

	const { data: gathering } = useGetGathering(accessKey);

	useEffect(() => {
		if (gathering) {
			trackViewPage({
				page_id: PAGE_ID,
				group_id: gathering.accessKey,
			});
		}
	}, [gathering]);

	return (
		<>
			<Layout.Header background="gray">
				<div className="ygi:h-full ygi:w-full" />
			</Layout.Header>
			<Layout.Content background="gray">
				<section className="ygi:flex ygi:h-full ygi:flex-col ygi:bg-clip-padding">
					<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6">
						<LogoIcon className="ygi:text-button-secondary" />
						<h1 className="ygi:display-24-bd ygi:whitespace-pre-line ygi:text-text-primary">
							메뉴 고르기 어려우시죠?
							<br />
							취향만 입력해 주세요
						</h1>
						<GatheringDateBadge />
					</div>
					<LandingIntroLottie />
				</section>
			</Layout.Content>
			<Layout.Footer background="gray">
				<div className="ygi:py-auto ygi:px-6">
					<OpinionStartButton />
				</div>
			</Layout.Footer>
		</>
	);
}
