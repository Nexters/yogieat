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
// Figma 디자인 기준으로 업데이트됨 (top: 421px 기준, 상대 좌표로 변환)
export const PEOPLE_POSITIONS: Record<number, Position[]> = {
	1: [{ x: 187.5, y: 90 }],

	2: [
		{ x: 127.5, y: 90 },
		{ x: 247.5, y: 90 },
	],

	3: [
		{ x: 102.5, y: 70 },
		{ x: 187.5, y: 70 },
		{ x: 272.5, y: 70 },
	],

	4: [
		{ x: 256, y: 54 },
		{ x: 114, y: 63 },
		{ x: 225, y: 117 },
		{ x: 151, y: 118 },
	],

	5: [
		{ x: 192, y: 48 },
		{ x: 252, y: 56 },
		{ x: 114, y: 63 },
		{ x: 225, y: 119 },
		{ x: 151, y: 119 },
	],

	6: [
		{ x: 108, y: 28 },
		{ x: 180, y: 52 },
		{ x: 265, y: 22 },
		{ x: 78, y: 98 },
		{ x: 195, y: 118 },
		{ x: 285, y: 95 },
	],

	7: [
		{ x: 187.5, y: 25 },
		{ x: 275, y: 40 },
		{ x: 100, y: 33 },
		{ x: 125, y: 110 },
		{ x: 200, y: 75 },
		{ x: 245, y: 115 },
		{ x: 210, y: 135 },
	],

	8: [
		{ x: 85, y: 48 },
		{ x: 165, y: 25 },
		{ x: 245, y: 68 },
		{ x: 305, y: 35 },
		{ x: 50, y: 105 },
		{ x: 135, y: 120 },
		{ x: 215, y: 88 },
		{ x: 285, y: 110 },
	],

	9: [
		{ x: 160, y: 35 },
		{ x: 240, y: 52 },
		{ x: 300, y: 50 },
		{ x: 105, y: 45 },
		{ x: 50, y: 110 },
		{ x: 180, y: 130 },
		{ x: 100, y: 145 },
		{ x: 230, y: 142 },
		{ x: 310, y: 132 },
	],

	10: [
		{ x: 160, y: 35 },
		{ x: 245, y: 55 },
		{ x: 65, y: 25 },
		{ x: 310, y: 30 },
		{ x: 120, y: 95 },
		{ x: 210, y: 130 },
		{ x: 55, y: 80 },
		{ x: 145, y: 145 },
		{ x: 290, y: 105 },
		{ x: 240, y: 150 },
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
