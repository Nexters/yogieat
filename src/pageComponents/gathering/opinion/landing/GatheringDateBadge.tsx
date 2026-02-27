"use client";

import { format, parse } from "date-fns";
import { useParams } from "next/navigation";

import { useGetGathering } from "#/hooks/apis/gathering";

export const GatheringDateBadge = () => {
	const { accessKey } = useParams<{ accessKey: string }>();
	const { data: gathering } = useGetGathering(accessKey);

	const formattedScheduledDate = format(
		parse(gathering.scheduledDate, "yyyy-MM-dd", new Date()),
		"yyyy년 MM월 dd일 약속",
	);

	return (
		<div className="ygi:inline-flex ygi:w-fit ygi:items-center ygi:justify-center ygi:rounded-full ygi:bg-button-secondary ygi:px-4 ygi:py-2">
			<span className="ygi:body-16-bd ygi:text-text-inverse">
				{formattedScheduledDate}
			</span>
		</div>
	);
};
