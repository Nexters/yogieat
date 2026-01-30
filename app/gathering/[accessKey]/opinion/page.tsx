import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";
import OpinionView from "./OpinionView";

interface OpinionPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

/**
 * 의견 수렴 페이지 (서버 컴포넌트)
 * - gathering 데이터를 서버에서 prefetch하여 무한 렌더링 방지
 */
export default async function OpinionPage({ params }: OpinionPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient();

	// 서버에서 gathering 데이터 미리 가져오기
	await queryClient.prefetchQuery(gatheringQueryOptions.detail(accessKey));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<OpinionView />
		</HydrationBoundary>
	);
}
