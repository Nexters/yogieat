"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { trackStepComplete } from "#/components/analytics";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { Button } from "#/components/button";
import { InputField } from "#/components/inputField";
import { nicknameSchema, type OpinionFormSchema } from "#/schemas/gathering";

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

const Content = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<OpinionFormSchema>();

	return (
		<InputField
			{...register("nickname")}
			placeholder="이름을 입력해주세요"
			errorText={errors.nickname?.message}
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
