import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";
import CompleteView from "./CompleteView";

interface OpinionCompletePageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

/**
 * 의견 수렴 완료 페이지 (서버 컴포넌트)
 * - gathering capacity 데이터를 서버에서 prefetch하여 무한 렌더링 방지
 */
export default async function OpinionCompletePage({
	params,
}: OpinionCompletePageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(gatheringQueryOptions.capacity(accessKey));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CompleteView />
		</HydrationBoundary>
	);
}
