"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { PersonCharacter } from "./PersonCharacter";

interface PeopleGroupProps {
	count: number | null;
}

import type { Transition, Variant } from "motion/react";

export interface Position {
	x: number;
	y: number;
}

// NOTE: 유효 범위 고려 - x: 42~333, y: 45~135 (캐릭터 중심 기준)
export const PEOPLE_POSITIONS: Record<number, Position[]> = {
	1: [{ x: 187.5, y: 70 }],

	2: [
		{ x: 145, y: 70 },
		{ x: 230, y: 70 },
	],

	3: [
		{ x: 145, y: 55 },
		{ x: 230, y: 55 },
		{ x: 187.5, y: 85 },
	],

	4: [
		{ x: 152.5, y: 55 },
		{ x: 222.5, y: 55 },
		{ x: 112.5, y: 85 },
		{ x: 262.5, y: 85 },
	],

	5: [
		{ x: 145, y: 50 },
		{ x: 230, y: 50 },
		{ x: 115, y: 80 },
		{ x: 187.5, y: 80 },
		{ x: 260, y: 80 },
	],

	6: [
		{ x: 127.5, y: 50 },
		{ x: 187.5, y: 50 },
		{ x: 247.5, y: 50 },
		{ x: 97.5, y: 85 },
		{ x: 187.5, y: 85 },
		{ x: 277.5, y: 85 },
	],

	7: [
		{ x: 122.5, y: 50 },
		{ x: 187.5, y: 50 },
		{ x: 252.5, y: 50 },
		{ x: 67.5, y: 85 },
		{ x: 147.5, y: 85 },
		{ x: 227.5, y: 85 },
		{ x: 307.5, y: 85 },
	],

	8: [
		{ x: 95, y: 50 },
		{ x: 160, y: 50 },
		{ x: 215, y: 50 },
		{ x: 280, y: 50 },
		{ x: 55, y: 85 },
		{ x: 150, y: 85 },
		{ x: 225, y: 85 },
		{ x: 320, y: 85 },
	],

	9: [
		{ x: 122.5, y: 48 },
		{ x: 187.5, y: 48 },
		{ x: 252.5, y: 48 },
		{ x: 90, y: 73 },
		{ x: 187.5, y: 73 },
		{ x: 285, y: 73 },
		{ x: 42, y: 98 },
		{ x: 187.5, y: 98 },
		{ x: 333, y: 98 },
	],

	10: [
		{ x: 132.5, y: 45 },
		{ x: 187.5, y: 45 },
		{ x: 242.5, y: 45 },
		{ x: 105, y: 70 },
		{ x: 187.5, y: 70 },
		{ x: 270, y: 70 },
		{ x: 42, y: 95 },
		{ x: 139, y: 95 },
		{ x: 236, y: 95 },
		{ x: 333, y: 95 },
	],
};

export const POP_IN_VARIANT = {
	hidden: {
		opacity: 0,
		scale: 0,
		y: 10,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		scale: 0,
		y: -10,
	},
} satisfies Record<string, Variant>;

export const POP_IN_TRANSITION: Transition = {
	type: "spring",
	stiffness: 500,
	damping: 25,
};

export const MOVE_TRANSITION: Transition = {
	type: "spring",
	stiffness: 300,
	damping: 30,
};

export const EXIT_TRANSITION = (delay: number): Transition => ({
	type: "spring",
	stiffness: 400,
	damping: 20,
	delay,
});

const MAX_PEOPLE = 10;

export const PeopleGroup = ({ count }: PeopleGroupProps) => {
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
						<PersonCharacter
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
