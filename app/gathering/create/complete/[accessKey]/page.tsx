"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { twJoin } from "tailwind-merge";

import { trackCtaClick, trackViewPage } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { Button } from "#/components/button";
import { MeetingCompleteIllustration } from "#/components/illustrations";

const PAGE_ID = "모임생성_완료";

export default function GatheringCreateCompletePage() {
	const params = useParams<{ accessKey: string }>();
	const router = useRouter();

	const handlePreferenceInput = () => {
		trackCtaClick({ page_id: PAGE_ID, button_name: "내 취향 입력" });
		router.push(`/gathering/${params.accessKey}/opinion`);
	};

	const handleRecreateLink = () => {
		trackCtaClick({
			page_id: PAGE_ID,
			button_name: "모임 링크 다시 만들기",
		});
		router.push("/gathering/create");
	};

	useEffect(() => {
		if (!params.accessKey) return;

		trackViewPage({
			page_id: PAGE_ID,
			group_id: params.accessKey,
		});
	}, [params.accessKey]);

	return (
		<Layout.Root>
			<main
				className={twJoin(
					"ygi:relative ygi:h-dvh ygi:pt-layout-header-height",
					"ygi:pb-[calc(148px+env(safe-area-inset-bottom))]",
					"ygi:scrollbar-hide ygi:overflow-x-hidden ygi:overflow-y-auto",
					"ygi:bg-bg-white",
				)}
			>
				<section className="ygi:pt-3">
					<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:px-6">
						<h1 className="ygi:heading-22-bd ygi:text-text-primary">
							모임 링크 생성 완료!
							<br />
							이제 나의 맛집 취향을 알려주세요
						</h1>
					</div>

					<div className="ygi:mt-21 ygi:flex ygi:justify-center">
						<MeetingCompleteIllustration />
					</div>
				</section>
			</main>

			<footer
				className={twJoin(
					"ygi:fixed ygi:bottom-0 ygi:left-0 ygi:z-layout-footer",
					"ygi:flex ygi:w-full ygi:items-center ygi:justify-center",
				)}
			>
				<div
					className={twJoin(
						"ygi:w-full ygi:max-w-root-layout ygi:bg-bg-white",
						"ygi:pb-[env(safe-area-inset-bottom)]",
					)}
				>
					<div className="ygi:flex ygi:flex-col ygi:gap-1 ygi:px-6 ygi:py-4">
						<Button
							variant="primary"
							width="full"
							onClick={handlePreferenceInput}
						>
							내 취향 입력
						</Button>
						<button
							type="button"
							onClick={handleRecreateLink}
							className={twJoin(
								"ygi:flex ygi:h-14 ygi:items-center ygi:justify-center",
								"ygi:body-16-md ygi:text-text-secondary ygi:underline",
								"ygi:cursor-pointer ygi:bg-transparent",
							)}
						>
							모임 링크 다시 만들기
						</button>
					</div>
				</div>
			</footer>
		</Layout.Root>
	);
}
