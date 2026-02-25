"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
	POP_IN_VARIANT,
	POP_IN_TRANSITION,
	MOVE_TRANSITION,
	EXIT_TRANSITION,
	type Position,
} from "./PeopleIllustration.constants";

interface CharacterProps {
	position: Position;
	characterId: number;
	index: number;
	isNew: boolean;
	exitDelay?: number;
}

const CHARACTER_WIDTH = 84;
const CHARACTER_HEIGHT = 90;

export const Character = ({
	position,
	characterId,
	index,
	isNew,
	exitDelay = 0,
}: CharacterProps) => {
	const leftPosition = position.x - CHARACTER_WIDTH / 2;
	const topPosition = position.y - CHARACTER_HEIGHT / 2;

	const initial = isNew ? POP_IN_VARIANT.hidden : false;
	const transition = isNew
		? { ...POP_IN_TRANSITION, delay: index * 0.08 }
		: MOVE_TRANSITION;

	return (
		<motion.div
			layout
			initial={initial}
			animate={POP_IN_VARIANT.visible}
			exit={{
				...POP_IN_VARIANT.exit,
				transition: EXIT_TRANSITION(exitDelay),
			}}
			transition={transition}
			className="ygi:absolute ygi:flex ygi:items-center ygi:justify-center"
			style={{
				left: `${leftPosition}px`,
				top: `${topPosition}px`,
				width: `${CHARACTER_WIDTH}px`,
				height: `${CHARACTER_HEIGHT}px`,
			}}
		>
			<Image
				src={`/images/people/character_${characterId}.svg`}
				alt={`Person ${characterId}`}
				width={CHARACTER_WIDTH}
				height={CHARACTER_HEIGHT}
				priority
				className="ygi:h-full ygi:w-full ygi:object-contain"
			/>
		</motion.div>
	);
};
