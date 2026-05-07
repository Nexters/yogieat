"use client";

import { notFound } from "next/navigation";

import { ERROR_CODES, isApiError } from "#/utils/api";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
	if (isApiError(error)) {
		switch (error.errorCode) {
			case ERROR_CODES.RESTAURANT_NOT_FOUND: {
				notFound();
			}
		}
	}

	throw error;
}
