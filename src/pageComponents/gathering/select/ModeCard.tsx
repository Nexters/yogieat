import { twJoin } from "tailwind-merge";

import { AloneIllustration } from "./AloneIllustration";
import { TogetherIllustration } from "./TogetherIllustration";

export type GatheringMode = "alone" | "together";

const ILLUSTRATIONS: Record<GatheringMode, React.ReactNode> = {
	alone: <AloneIllustration />,
	together: <TogetherIllustration />,
};

interface ModeCardProps {
	mode: GatheringMode;
	isSelected: boolean;
	onSelect: (mode: GatheringMode) => void;
}

export const ModeCard = ({ mode, isSelected, onSelect }: ModeCardProps) => (
	<button
		type="button"
		onClick={() => onSelect(mode)}
		className={twJoin(
			"ygi:flex ygi:h-52.5 ygi:flex-1 ygi:cursor-pointer ygi:flex-col ygi:items-center ygi:justify-center ygi:gap-md ygi:rounded-xl ygi:p-md ygi:transition-all",
			isSelected
				? "ygi:bg-button-tertiary-hover"
				: "ygi:bg-button-tertiary-disabled ygi:hover:bg-button-tertiary",
		)}
	>
		{ILLUSTRATIONS[mode]}
		<div className="ygi:flex ygi:flex-col ygi:items-center">
			<span className="ygi:body-16-bd ygi:text-text-primary">
				{mode === "alone" ? "혼자서" : "여럿이서"}
			</span>
			<span className="ygi:body-16-bd ygi:text-text-primary">
				{mode === "alone" ? "바로 정할게요" : "같이 정할게요"}
			</span>
		</div>
	</button>
);
