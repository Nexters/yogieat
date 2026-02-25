"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { PEOPLE_POSITIONS } from "./PeopleIllustration.constants";
import { Character } from "./Character";

interface PeopleIllustrationProps {
	count: number | null;
}

const MAX_PEOPLE = 10;

export const PeopleIllustration = ({ count }: PeopleIllustrationProps) => {
	const currentCount = count ?? 0;
	const [prevCount, setPrevCount] = useState(currentCount);

	if (currentCount !== prevCount) {
		setPrevCount(currentCount);
	}

	const isNewCharacter = useCallback(
		(index: number): boolean => {
			return prevCount < currentCount && index >= prevCount;
		},
		[prevCount, currentCount],
	);

	if (!count || count < 1 || count > MAX_PEOPLE) return null;

	const needRenderCount = Math.max(prevCount, count);

	// NOTE: 증가/감소 모두 애니메이션을 위해 max count만큼 렌더링
	const currentPositions = PEOPLE_POSITIONS[count] || [];
	const renderPositions = PEOPLE_POSITIONS[needRenderCount] || [];
	const sortedPositions = [...renderPositions].sort((a, b) => a.y - b.y);

	return (
		<div className="ygi:relative ygi:h-45 ygi:w-93.75">
			<AnimatePresence>
				{sortedPositions.map((position, index) => {
					const characterId = (index % MAX_PEOPLE) + 1;
					const isRemoving = index >= count;
					const exitDelay = isRemoving
						? (needRenderCount - index - 1) * 0.08
						: 0;
					const targetPosition = currentPositions[index] ?? position;

					// NOTE: 인원 수 감소 시 사라질 캐릭터는 이전 위치를 유지하도록 지정
					const displayPosition = isRemoving
						? position
						: targetPosition;

					return (
						<Character
							key={`person-${index}`}
							position={displayPosition}
							characterId={characterId}
							index={index}
							isNew={isNewCharacter(index)}
							exitDelay={exitDelay}
						/>
					);
				})}
			</AnimatePresence>
		</div>
	);
};
