"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BackwardButton } from "#/components/backwardButton";
import { Button } from "#/components/button";
import { DotsLoader } from "#/components/dotsLoader";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";

import { type GatheringMode, ModeCard } from "./ModeCard";

export function SelectPage() {
	const router = useRouter();
	const [selected, setSelected] = useState<GatheringMode | null>(null);
	const [isPending, setIsPending] = useState(false);

	const handleNext = () => {
		if (!selected) return;
		setIsPending(true);
		router.push(
			selected === "alone" ? "/gathering/alone" : "/gathering/create",
		);
	};

	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton onClick={() => router.back()} />
			</Layout.Header>

			<Layout.Content>
				<div className="ygi:flex ygi:flex-col ygi:gap-6 ygi:px-6 ygi:pt-3">
					<StepHeader.Root>
						<StepHeader.Title>
							이번에 갈 맛집,
							<br />
							어떻게 정할 건가요?
						</StepHeader.Title>
					</StepHeader.Root>

					<div className="ygi:flex ygi:gap-sm">
						<ModeCard
							mode="alone"
							isSelected={selected === "alone"}
							onSelect={setSelected}
						/>
						<ModeCard
							mode="together"
							isSelected={selected === "together"}
							onSelect={setSelected}
						/>
					</div>
				</div>
			</Layout.Content>

			<Layout.Footer>
				<div className="ygi:px-6">
					<Button
						type="button"
						variant="primary"
						width="full"
						disabled={!selected || isPending}
						onClick={handleNext}
					>
						{isPending ? <DotsLoader /> : "다음"}
					</Button>
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
