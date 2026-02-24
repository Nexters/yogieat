"use client";

import Link from "next/link";
import { Layout } from "#/components/layout";
import { Button } from "#/components/button";
import { NotFoundIllustration } from "#/components/illustrations";

export default function NotFound() {
	return (
		<Layout.Root>
			<Layout.Content>
				<div className="ygi:flex ygi:h-full ygi:flex-col ygi:items-center ygi:justify-center ygi:px-6">
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-10">
						<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-2 ygi:text-center">
							<p className="ygi:body-16-md ygi:text-text-secondary">
								어랏...
							</p>
							<h1 className="ygi:heading-22-bd ygi:text-text-primary">
								존재하지 않는 페이지에요
							</h1>
						</div>

						<NotFoundIllustration />

						<Link href="/">
							<Button>홈으로 가기</Button>
						</Link>
					</div>
				</div>
			</Layout.Content>
		</Layout.Root>
	);
}
