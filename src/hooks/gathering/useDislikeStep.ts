import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FoodCategory } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";

export function useDislikeStep(control: Control<OpinionFormSchema>) {
	const { field } = useController({
		name: "dislikedFoods",
		control,
	});

	const dislikedFoods = field.value || [];

	const handleFoodSelect = (food: FoodCategory) => {
		field.onChange([food]);
	};

	const isValid = dislikedFoods.length > 0;

	return {
		dislikedFoods,
		handleFoodSelect,
		isValid,
	};
}
