import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getRecommendResult } from "#/apis/recommendResult";
import { RecommendationResultStatus } from "#/constants/gathering/opinion";
import { isApiError } from "#/types/api/error";

interface UseRecommendResultPollingOptions {
	accessKey: string;
	enabled: boolean;
}

export const useWaitForRecommendResult = ({
	accessKey,
	enabled,
}: UseRecommendResultPollingOptions) => {
	const router = useRouter();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isPollingRef = useRef(false);

	useEffect(() => {
		if (!enabled || isPollingRef.current) return;

		isPollingRef.current = true;

		const poll = async () => {
			try {
				const response = await getRecommendResult(accessKey);
				const result = response.data;

				switch (result.status) {
					case RecommendationResultStatus.COMPLETED: {
						isPollingRef.current = false;
						router.push(`/gathering/${accessKey}/opinion/result`);
						break;
					}

					case RecommendationResultStatus.PENDING: {
						timeoutRef.current = setTimeout(() => {
							poll();
						}, 1000);
						break;
					}

					case RecommendationResultStatus.FAILED:
					default: {
						isPollingRef.current = false;
						toast.error(
							"추천 결과 생성에 실패했습니다. 다시 시도해주세요.",
						);
						break;
					}
				}
			} catch (error: unknown) {
				isPollingRef.current = false;

				if (isApiError(error)) {
					const errorMessage = error.response?.data?.message;
					toast.error(
						errorMessage || "추천 결과를 불러오는데 실패했습니다.",
					);
				} else {
					toast.error("추천 결과를 불러오는데 실패했습니다.");
				}
			}
		};

		poll();

		return () => {
			isPollingRef.current = false;
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [enabled, accessKey, router]);

	return { isWaiting: enabled };
};
