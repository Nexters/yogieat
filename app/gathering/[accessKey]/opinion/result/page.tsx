import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { gatheringOptions } from "#/apis/gathering";
import { recommendResultOptions } from "#/apis/recommendResult";
import ResultView from "./ResultView";

interface OpinionResultPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

/**
 * 의견 수렴 결과 페이지 (서버 컴포넌트)
 * - gathering capacity, recommend-result 데이터를 서버에서 prefetch하여 무한 렌더링 방지
 */
export default async function OpinionResultPage({
	params,
}: OpinionResultPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery(gatheringOptions.capacity(accessKey)),
		queryClient.prefetchQuery(recommendResultOptions.detail(accessKey)),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ResultView />
		</HydrationBoundary>
	);
}
