"use client";

import { useRouter } from "next/navigation";

import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";

type GatheringMode = "alone" | "together";

interface ModeOptionProps {
	title: string;
	description: string;
	onClick: () => void;
}

const ModeOption = ({ title, description, onClick }: ModeOptionProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="ygi:flex ygi:w-full ygi:cursor-pointer ygi:flex-col ygi:gap-2 ygi:rounded-xl ygi:bg-button-tertiary ygi:px-5 ygi:py-6 ygi:text-left ygi:transition-colors ygi:hover:bg-button-tertiary-hover"
		>
			<span className="ygi:heading-18-bd ygi:text-text-primary">
				{title}
			</span>
			<span className="ygi:body-14-rg ygi:text-text-secondary">
				{description}
			</span>
		</button>
	);
};

const ROUTE: Record<GatheringMode, string> = {
	alone: "/gathering/alone",
	together: "/gathering/create",
};

export function SelectPage() {
	const router = useRouter();

	const handleSelect = (mode: GatheringMode) => {
		router.push(ROUTE[mode]);
	};

	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton onClick={() => router.back()} />
			</Layout.Header>

			<Layout.Content>
				<div className="ygi:flex ygi:h-full ygi:flex-col ygi:gap-6 ygi:px-6 ygi:pt-3">
					<StepHeader.Root>
						<StepHeader.Title>
							어떻게 정할까요?
						</StepHeader.Title>
					</StepHeader.Root>

					<div className="ygi:flex ygi:flex-col ygi:gap-3">
						<ModeOption
							title="혼자서 바로 정할게요"
							description="내 취향을 입력하면 바로 결과를 알려드려요"
							onClick={() => handleSelect("alone")}
						/>
						<ModeOption
							title="여럿이서 같이 정할게요"
							description="모임 링크를 만들고 함께 취향을 모아요"
							onClick={() => handleSelect("together")}
						/>
					</div>
				</div>
			</Layout.Content>
		</Layout.Root>
	);
}
