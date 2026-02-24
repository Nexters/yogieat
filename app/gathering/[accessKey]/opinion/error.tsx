"use client";

import { notFound, redirect, useParams } from "next/navigation";

import { ERROR_CODES, isApiError } from "#/utils/api";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
	const { accessKey } = useParams<{ accessKey: string }>();

	if (isApiError(error)) {
		switch (error.errorCode) {
			case ERROR_CODES.RECOMMEND_ALREADY_PROCEEDED: {
				redirect(`/gathering/${accessKey}/opinion/result`);
			}
			case ERROR_CODES.GATHERING_NOT_FOUND:
			case ERROR_CODES.GATHERING_DELETED: {
				notFound();
			}
		}
	}

	// FIXME : 추후 디자이너 단에서 에러 페이지 제공 시 시안 반영 필요
	return <div>오류가 발생했어요</div>;
}
