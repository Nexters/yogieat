"use client";

import { twJoin } from "tailwind-merge";

interface PeopleCountGridProps {
	value: number | null;
	onChange: (count: number | null) => void;
}

const PEOPLE_COUNTS = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export const PeopleCountGrid = ({ value, onChange }: PeopleCountGridProps) => {
	return (
		<div className="ygi:grid ygi:grid-cols-5 ygi:gap-2">
			{PEOPLE_COUNTS.map((count) => {
				const isSelected = value === count;
				return (
					<button
						key={count}
						type="button"
						onClick={() => onChange(isSelected ? null : count)}
						className={twJoin(
							"ygi:flex ygi:aspect-square ygi:w-full ygi:cursor-pointer ygi:items-center ygi:justify-center",
							"ygi:rounded-md",
							"ygi:body-18-bd",
							isSelected
								? "ygi:bg-button-secondary ygi:text-text-inverse ygi:hover:bg-button-secondary-hover"
								: "ygi:bg-button-tertiary ygi:text-text-secondary ygi:hover:bg-button-tertiary-hover",
						)}
					>
						{count}
					</button>
				);
			})}
		</div>
	);
};
