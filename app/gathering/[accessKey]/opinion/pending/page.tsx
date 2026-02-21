import { getGatheringCapacity } from "#/apis/gathering";
import { PendingViewContainer } from "./PendingViewContainer";

interface OpinionPendingPageProps {
	params: Promise<{
		accessKey: string;
	}>;
}

/**
 * 의견 수렴 대기 페이지 (서버 컴포넌트)
 */
export default async function OpinionPendingPage({
	params,
}: OpinionPendingPageProps) {
	const { accessKey } = await params;

	const { data: initialCapacity } = await getGatheringCapacity(accessKey);

	return (
		<PendingViewContainer
			accessKey={accessKey}
			initialMaxCount={initialCapacity.maxCount}
			initialCurrentCount={initialCapacity.currentCount}
		/>
	);
}
