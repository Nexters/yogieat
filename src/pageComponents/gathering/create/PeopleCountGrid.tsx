"use client";

import { twJoin } from "tailwind-merge";

interface PeopleCountGridProps {
	value: number | undefined;
	onChange: (count: number | undefined) => void;
}

const PEOPLE_COUNTS = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
] as const;

export const PeopleCountGrid = ({ value, onChange }: PeopleCountGridProps) => {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-3">
			{PEOPLE_COUNTS.map((row, rowIndex) => (
				<div key={rowIndex} className="ygi:flex ygi:gap-2">
					{row.map((count) => {
						const isSelected = value === count;
						return (
							<button
								key={count}
								type="button"
								onClick={() =>
									onChange(isSelected ? undefined : count)
								}
								className={twJoin(
									"ygi:flex ygi:aspect-square ygi:flex-1 ygi:cursor-pointer ygi:items-center ygi:justify-center",
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
			))}
		</div>
	);
};
