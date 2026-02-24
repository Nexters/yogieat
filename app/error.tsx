"use client";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Layout } from "#/components/layout";
import { Button } from "#/components/button";
import { NotFoundIllustration } from "#/components/illustrations";

interface ErrorPageProps {
	reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
	const { reset: resetQueryError } = useQueryErrorResetBoundary();

	const handleReset = () => {
		resetQueryError();
		reset();
	};

	return (
		<Layout.Root>
			<Layout.Content>
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

						<Button onClick={handleReset}>다시 시도</Button>
					</div>
				</div>
			</Layout.Content>
		</Layout.Root>
	);
}
