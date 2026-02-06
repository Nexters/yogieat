"use client";

import { useParams, useRouter } from "next/navigation";

import { Layout } from "#/components/layout";
import { BackwardButton } from "#/components/backwardButton";
import { Button } from "#/components/button";
import { MeetingCompleteIllustration } from "#/components/illustrations";
import { Toaster } from "#/components/toast";

export default function GatheringCreateCompletePage() {
	const params = useParams<{ accessKey: string }>();
	const router = useRouter();

	const handleBackward = () => {
		router.push("/gathering/create");
	};

	const handlePreferenceInput = () => {
		router.push(`/gathering/${params.accessKey}/opinion`);
	};

	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton onClick={handleBackward} />
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
