"use client";

import { notFound, redirect, useParams } from "next/navigation";

import { ERROR_CODES, isApiError } from "#/utils/api";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
	const { accessKey } = useParams<{ accessKey: string }>();

	// 클라이언트 refetch 에러만 처리 (서버 에러는 이미 page.tsx에서 처리됨)
	if (isApiError(error)) {
		switch (error.errorCode) {
			case ERROR_CODES.RECOMMEND_ALREADY_PROCEEDED: {
				redirect(`/gathering/${accessKey}/opinion/result`);
			}
			case ERROR_CODES.PARTICIPANT_MAJORITY_NOT_REACHED: {
				redirect(`/gathering/${accessKey}/opinion/pending`);
			}
			case ERROR_CODES.RESTAURANT_NOT_FOUND:
			case ERROR_CODES.CATEGORY_NOT_FOUND:
			case ERROR_CODES.GATHERING_NOT_FOUND:
			case ERROR_CODES.GATHERING_DELETED: {
				notFound();
			}
		}
	}

	return <div>오류가 발생했어요</div>;
}
