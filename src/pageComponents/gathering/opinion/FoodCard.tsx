"use client";

import Image from "next/image";

interface FoodCardProps {
	category: string;
}

export const FoodCard = ({ category }: FoodCardProps) => {
	const imageSrc = `/images/foodCategory/${category.toLowerCase()}.svg`;

	return (
		<div className="ygi:flex ygi:h-45 ygi:w-50 ygi:shrink-0 ygi:items-center ygi:justify-center ygi:overflow-hidden ygi:rounded-[20px] ygi:bg-surface-white">
			<div className="ygi:relative ygi:size-28">
				<Image
					src={imageSrc}
					alt={category}
					fill
					className="ygi:object-contain"
				/>
			</div>
		</div>
	);
};
