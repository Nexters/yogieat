"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useParams } from "next/navigation";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { InputField } from "#/components/inputField";
import { nicknameSchema, type OpinionFormSchema } from "#/schemas/gathering";
import { useRandomNickname } from "#/hooks/gathering";
import { useValidateNickname } from "#/hooks/apis/participant";
import { ERROR_CODES, isApiError } from "#/utils/api";
import { toast } from "#/utils/toast";

const Header = () => {
	return (
		<StepHeader.Root>
			<StepHeader.Title>
				모임 링크에 입장하기 위해
				<br />
				이름을 입력해주세요
			</StepHeader.Title>
			<StepHeader.Description>
				모임원을 식별하는 용도예요
			</StepHeader.Description>
		</StepHeader.Root>
	);
};

const RefreshIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
			fill="#6B7280"
		/>
	</svg>
);

const Content = () => {
	const {
		register,
		setValue,
		getValues,
		control,
		formState: { errors },
	} = useFormContext<OpinionFormSchema>();

	const nickname = useWatch({ control, name: "nickname" });

	const { initialNickname, getNextNickname } = useRandomNickname();

	const handleRefresh = () => {
		const next = getNextNickname();
		setValue("nickname", next, { shouldValidate: true });
	};

	const handleClear = () => {
		setValue("nickname", "", { shouldValidate: true });
	};

	useEffect(() => {
		// 이미 입력된 값이 있으면 덮어쓰지 않음 (뒤로가기 복귀 시 기존 값 유지)
		if (!getValues("nickname")) {
			setValue("nickname", initialNickname, { shouldValidate: true });
		}
	}, [setValue, getValues, initialNickname]);

	return (
		<InputField
			{...register("nickname")}
			value={nickname ?? ""}
			placeholder="이름을 입력해주세요"
			errorText={errors.nickname?.message}
			showClearButton
			onClear={handleClear}
			rightSlot={
				<button
					type="button"
					onClick={handleRefresh}
					className="ygi:flex ygi:size-6 ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:rounded-full ygi:transition-colors ygi:hover:bg-palette-gray-100"
					aria-label="다른 이름 추천받기"
				>
					<RefreshIcon />
				</button>
			}
		/>
	);
};

interface FooterProps {
	onNext: () => void;
}

const Footer = ({ onNext }: FooterProps) => {
	const { control } = useFormContext<OpinionFormSchema>();
	const { accessKey } = useParams<{ accessKey: string }>();
	const { mutateAsync: validateNickname, isPending } = useValidateNickname();

	const { nickname, isValid } = useWatch({
		control,
		name: "nickname",
		compute: (nickname) => ({
			nickname,
			isValid: nicknameSchema.safeParse(nickname).success,
		}),
	});

	const handleNext = async () => {
		try {
			await validateNickname({ accessKey, nickname: nickname ?? "" });
		} catch (error) {
			if (
				isApiError(error) &&
				error.errorCode === ERROR_CODES.DUPLICATE_NICKNAME
			) {
				toast.warning("이미 사용 중인 이름이에요");
			} else {
				toast.warning("확인 중 문제가 발생했어요. 다시 시도해주세요.");
			}
			return;
		}

		trackStepComplete({
			page_id: "의견수합_퍼널",
			step_name: "이름",
			step_value: nickname,
		});

		onNext();
	};

	return (
		<Layout.Footer>
			<div className="ygi:px-6">
				<Button
					variant="primary"
					width="full"
					disabled={!isValid || isPending}
					onClick={handleNext}
				>
					다음
				</Button>
			</div>
		</Layout.Footer>
	);
};

export const NicknameStep = {
	Header,
	Content,
	Footer,
};
