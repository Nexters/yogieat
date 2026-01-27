"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

import { IntroStep } from "#/pageComponents/gathering/opinion";
import { useOpinionFunnel } from "#/hooks/gathering";
import { Button } from "#/components/button";
import { Layout } from "#/components/layout";
import { MOCK_MEETING_DATA } from "#/constants/gathering/opinion/meeting";
import { MeetingContext } from "#/types/gathering";

export default function OpinionPage() {
	const params = useParams();
	const gatheringId = params.gatheringId as string;
	const { step, next } = useOpinionFunnel();

	// Meeting context
	const meetingContext = useMemo<MeetingContext>(
		() => ({
			gatheringId,
			meetingDate: MOCK_MEETING_DATA.DATE,
			stationName: MOCK_MEETING_DATA.STATION_NAME,
		}),
		[gatheringId],
	);

	// Intro step - special layout
	if (step === "intro") {
		return (
			<Layout.Root>
				<Layout.Header background="gray">
					<div className="ygi:h-full ygi:w-full" />
				</Layout.Header>
				<Layout.Content background="gray">
					<IntroStep
						step="intro"
						meetingContext={meetingContext}
						onNext={next}
					/>
				</Layout.Content>
				<Layout.Footer background="gray">
					<div className="ygi:py-auto ygi:px-6">
						<Button variant="primary" width="full" onClick={next}>
							내 취향 입력
						</Button>
					</div>
				</Layout.Footer>
			</Layout.Root>
		);
	}
}
