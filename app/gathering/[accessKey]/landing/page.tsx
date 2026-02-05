import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import { gatheringQueryOptions } from "#/apis/gathering";
import { LandingView } from "#/pageComponents/gathering/opinion";

interface LandingPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

/**
 * 의견 수렴 랜딩 페이지 (서버 컴포넌트)
 * - 공유 링크로 접근 시 IntroStep을 보여줌
 * - gathering 데이터를 서버에서 prefetch하여 무한 렌더링 방지
 */
export default async function LandingPage({ params }: LandingPageProps) {
	const { accessKey } = await params;
	const queryClient = new QueryClient();

	// 서버에서 gathering 데이터 미리 가져오기
	await Promise.all([
		queryClient.prefetchQuery(gatheringQueryOptions.detail(accessKey)),
		queryClient.prefetchQuery(gatheringQueryOptions.capacity(accessKey)),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LandingView />
		</HydrationBoundary>
	);
}
