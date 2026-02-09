"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { twJoin } from "tailwind-merge";

import { trackCtaClick, trackPageView } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { Button } from "#/components/button";
import { MeetingCompleteIllustration } from "#/components/illustrations";
import { Toaster } from "#/components/toast";
import { HomeIcon } from "#/icons/homeIcon";

const PAGE_ID = "모임생성_완료";

export default function GatheringCreateCompletePage() {
	const params = useParams<{ accessKey: string }>();
	const router = useRouter();

	const handleHomeButtonClick = () => {
		router.push("/");
	};

	const handlePreferenceInput = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "내 취향 입력" });
		router.push(`/gathering/${params.accessKey}/opinion`);
	};

	useEffect(() => {
		if (!params.accessKey) return;

		trackPageView("view_gathering_create_complete_page", {
			page_id: PAGE_ID,
			group_id: params.accessKey,
		});
	}, [params.accessKey]);

	return (
		<Layout.Root>
			<Layout.Header>
				<button
					type="button"
					aria-label="홈으로 가기"
					onClick={handleHomeButtonClick}
					className={twJoin(
						"ygi:flex ygi:items-center ygi:justify-center",
						"ygi:h-12 ygi:w-12 ygi:p-3",
						"ygi:cursor-pointer ygi:bg-transparent",
					)}
				>
					<HomeIcon size={24} className="ygi:text-icon-default" />
				</button>
			</Layout.Header>

			<Layout.Content>
				<section className="ygi:pt-3">
					<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
						<h1 className="ygi:heading-22-bd ygi:text-text-primary">
							모임 준비 끝!
							<br />
							공유하기 전에 내 취향 먼저 알려주세요
						</h1>
					</div>

					<div className="ygi:mt-16 ygi:flex ygi:justify-center">
						<MeetingCompleteIllustration />
					</div>
				</section>
			</Layout.Content>

			<Layout.Footer>
				<div className="ygi:flex ygi:gap-3 ygi:px-6">
					<Button
						variant="secondary"
						width="full"
						onClick={handlePreferenceInput}
					>
						내 취향 입력
					</Button>
				</div>
			</Layout.Footer>

			<Toaster offset={{ bottom: 96 }} mobileOffset={{ bottom: 96 }} />
		</Layout.Root>
	);
}
