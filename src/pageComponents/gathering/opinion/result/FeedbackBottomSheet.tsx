"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import { submitFeedback } from "#/actions/feedback";
import { BottomSheet } from "#/components/bottomSheet";
import { Button } from "#/components/button";
import {
	feedbackFormSchema,
	type FeedbackFormSchema,
} from "#/schemas/feedback/feedbackForm.schema";
import { toast } from "#/utils/toast";

interface FeedbackBottomSheetProps {
	open: boolean;
	accessKey: string;
	onOpenChange: (open: boolean) => void;
}

export const FeedbackBottomSheet = ({
	open,
	accessKey,
	onOpenChange,
}: FeedbackBottomSheetProps) => {
	const [isPending, startTransition] = useTransition();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const {
		register,
		handleSubmit,
		formState: { isValid },
		reset,
	} = useForm<FeedbackFormSchema>({
		resolver: zodResolver(feedbackFormSchema),
		mode: "onChange",
	});

	const { ref: registerRef, ...registerRest } = register("message");

	// BottomSheet 진입 애니메이션(200ms) 완료 후 textarea 자동 포커스
	useEffect(() => {
		if (!open) return;
		const timer = setTimeout(() => {
			textareaRef.current?.focus();
		}, 250);
		return () => clearTimeout(timer);
	}, [open]);

	const onSubmit = (data: FeedbackFormSchema) => {
		startTransition(async () => {
			try {
				const result = await submitFeedback(accessKey, data.message);

				if (result.success) {
					onOpenChange(false);
					// BottomSheet exit 애니메이션(200ms) 완료 후 form 리셋 및 토스트 노출
					setTimeout(() => {
						reset();
						toast.success("소중한 의견 감사해요!", { icon: "🙏🏻" });
					}, 300);
				} else {
					toast.warning("의견 전달에 실패했어요. 다시 시도해주세요.");
				}
			} catch {
				toast.warning("의견 전달에 실패했어요. 다시 시도해주세요.");
			}
		});
	};

	return (
		<BottomSheet open={open} onOpenChange={onOpenChange}>
			<BottomSheet.Content
				open={open}
				title="의견 제안"
				description="요기잇 서비스에 대한 의견을 남겨주세요"
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="ygi:flex ygi:flex-col ygi:gap-6"
				>
					<div className="ygi:flex ygi:flex-col ygi:gap-4">
						<h2 className="ygi:heading-18-bd ygi:whitespace-pre-line ygi:text-text-primary">
							{"의견과 피드백을\n자유롭게 작성해주세요"}
						</h2>
						<textarea
							{...registerRest}
							ref={(el) => {
								registerRef(el);
								textareaRef.current = el;
							}}
							placeholder="답변을 입력해주세요."
							maxLength={1000}
							// iOS에서 font-size < 16px이면 포커스 시 자동 줌인됨 → 16px로 override
							style={{ fontSize: "16px" }}
							className="focus:ygi:outline-none ygi:min-h-40 ygi:w-full ygi:resize-none ygi:rounded-md ygi:bg-surface-lightgray ygi:p-4 ygi:body-14-md ygi:text-text-primary ygi:placeholder:text-text-placeholder"
						/>
					</div>
					<Button
						type="submit"
						variant="primary"
						width="full"
						disabled={!isValid || isPending}
					>
						{isPending ? "전송 중..." : "응답 제출"}
					</Button>
				</form>
			</BottomSheet.Content>
		</BottomSheet>
	);
};
