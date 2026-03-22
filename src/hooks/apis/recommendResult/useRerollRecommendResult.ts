"use client";

import { useMutation } from "@tanstack/react-query";

import { recommendResultMutationOptions } from "#/apis/recommendResult";

export const useRerollRecommendResult = (accessKey: string) => {
	return useMutation(recommendResultMutationOptions.reroll(accessKey));
};
