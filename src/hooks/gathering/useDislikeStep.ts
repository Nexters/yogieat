import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FoodCategory } from "#/types/gathering";
import type { OpinionFormSchema } from "#/schemas/gathering";

/**
 * DislikeStep의 상태 및 로직을 관리하는 custom hook
 */
export function useDislikeStep(control: Control<OpinionFormSchema>) {
	const { field } = useController({
		name: "dislikedFoods",
		control,
	});

	const dislikedFoods = field.value || [];

	/**
	 * 음식 카테고리 선택 핸들러
	 * 다른 음식 선택 시만 변경 (토글 없음)
	 */
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
