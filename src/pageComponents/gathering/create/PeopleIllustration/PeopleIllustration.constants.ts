import type { Transition, Variant } from "motion/react";

// NOTE: 375x180 캔버스 내에서 캐릭터(84x90px) 위치 정의
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
		{ x: 157.5, y: 55 },
		{ x: 217.5, y: 55 },
		{ x: 137.5, y: 85 },
		{ x: 237.5, y: 85 },
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
		{ x: 97.5, y: 50 },
		{ x: 157.5, y: 50 },
		{ x: 217.5, y: 50 },
		{ x: 277.5, y: 50 },
		{ x: 67.5, y: 85 },
		{ x: 147.5, y: 85 },
		{ x: 227.5, y: 85 },
		{ x: 307.5, y: 85 },
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
