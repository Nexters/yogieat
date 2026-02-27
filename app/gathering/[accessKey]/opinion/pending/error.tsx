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
			case ERROR_CODES.RESTAURANT_NOT_FOUND:
			case ERROR_CODES.CATEGORY_NOT_FOUND:
			case ERROR_CODES.GATHERING_NOT_FOUND:
			case ERROR_CODES.GATHERING_DELETED: {
				notFound();
			}
		}
	}

	throw error;
}
