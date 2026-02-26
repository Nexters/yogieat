"use client";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { InputField } from "#/components/inputField";
import { nicknameSchema, type OpinionFormSchema } from "#/schemas/gathering";
import { useRandomNickname } from "#/hooks/gathering";

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
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			d="M13.65 2.35A8 8 0 1 0 15 8h-1.5a6.5 6.5 0 1 1-1.13-3.67L10 6.5h5v-5l-1.35 1.35Z"
			fill="#6B7280"
		/>
	</svg>
);

const Content = () => {
	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<OpinionFormSchema>();

	const { initialNickname, getNextNickname } = useRandomNickname();

	useEffect(() => {
		setValue("nickname", initialNickname, { shouldValidate: true });
	}, [setValue, initialNickname]);

	const handleRefresh = () => {
		const next = getNextNickname();
		setValue("nickname", next, { shouldValidate: true });
	};

	return (
		<InputField
			{...register("nickname")}
			placeholder="이름을 입력해주세요"
			errorText={errors.nickname?.message}
			rightSlot={
				<button
					type="button"
					onClick={handleRefresh}
					className="ygi:flex ygi:items-center ygi:justify-center ygi:size-6 ygi:rounded-full ygi:cursor-pointer ygi:transition-colors ygi:hover:bg-palette-gray-100"
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

	const { nickname, disabled } = useWatch({
		control,
		name: "nickname",
		compute: (nickname) => ({
			nickname,
			disabled: !nicknameSchema.safeParse(nickname).success,
		}),
	});

	const handleNext = () => {
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
					disabled={disabled}
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
