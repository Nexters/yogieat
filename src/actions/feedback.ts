"use server";

export type FeedbackResult =
	| { success: true }
	| { success: false; error: string };

export async function submitFeedback(
	accessKey: string,
	message: string,
): Promise<FeedbackResult> {
	const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;

	if (!webhookUrl) {
		throw new Error(
			"DISCORD_FEEDBACK_WEBHOOK_URL 환경변수가 설정되지 않았습니다.",
		);
	}

	try {
		const response = await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: `[요기잇 피드백] ${accessKey}\n\n${message}`,
			}),
		});

		if (!response.ok) {
			return {
				success: false,
				error: `Discord 웹훅 전송 실패 (${response.status})`,
			};
		}

		return { success: true };
	} catch {
		return { success: false, error: "네트워크 오류가 발생했습니다." };
	}
}
