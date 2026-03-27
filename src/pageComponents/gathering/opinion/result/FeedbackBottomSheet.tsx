"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitFeedback } from "#/actions/feedback";
import { BottomSheet } from "#/components/bottomSheet";
import { Button } from "#/components/button";
import {
  feedbackFormSchema,
  type FeedbackFormSchema,
} from "#/schemas/feedback/feedbackForm.schema";

interface FeedbackBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accessKey: string;
}

export function FeedbackBottomSheet({
  open,
  onOpenChange,
  accessKey,
}: FeedbackBottomSheetProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FeedbackFormSchema>({
    resolver: zodResolver(feedbackFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FeedbackFormSchema) => {
    startTransition(async () => {
      try {
        const result = await submitFeedback(accessKey, data.message);

        if (result.success) {
          onOpenChange(false);
          // BottomSheet exit 애니메이션(200ms) 완료 후 form 리셋 및 토스트 노출
          setTimeout(() => {
            reset();
            toast("의견이 전달됐어요!");
          }, 300);
        } else {
          toast("의견 전달에 실패했어요. 다시 시도해주세요.");
        }
      } catch {
        toast("의견 전달에 실패했어요. 다시 시도해주세요.");
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
          <div className="ygi:flex ygi:flex-col ygi:gap-2">
            <h2 className="ygi:heading-18-bd ygi:whitespace-pre-line ygi:text-text-primary">
              {"의견과 피드백을\n자유롭게 작성해주세요"}
            </h2>
            <textarea
              {...register("message")}
              placeholder="답변을 입력해주세요."
              maxLength={1000}
              className="ygi:min-h-[160px] ygi:w-full ygi:resize-none ygi:rounded-xl ygi:bg-surface-lightgray ygi:p-4 ygi:body-14-md ygi:text-text-primary ygi:placeholder:text-text-placeholder focus:ygi:outline-none"
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
}
