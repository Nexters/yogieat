"use client";

import { Button } from "#/components/button";
import { toast } from "#/utils/toast";

export const ToastTest = () => {
	return (
		<Button
			onClick={() =>
				toast.warning("이미 선택되었어요. 다른 메뉴를 골라주세요!")
			}
		>
			Toast 테스트
		</Button>
	);
};
