"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "#/components/button/Button";
import { Dialog } from "#/components/dialog";
import { Input } from "#/components/inputField";
import { XIcon } from "#/icons/xIcon";

const MAX_LENGTH = 18;

interface RegionRequestDialogProps {
	onClose: () => void;
}

export const RegionRequestDialog = ({ onClose }: RegionRequestDialogProps) => {
	const [value, setValue] = useState("");

	const handleSubmit = () => {
		toast("원하는 지역 요청이 접수되었어요!");
		onClose();
	};

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-5">
			<div className="ygi:flex ygi:flex-col ygi:gap-3">
				<div className="ygi:flex ygi:items-center ygi:gap-3">
					<p className="ygi:flex-1 ygi:heading-18-bd ygi:text-text-primary">
						원하는 지역을 입력해 주세요
					</p>
					<Dialog.Close asChild>
						<button
							type="button"
							className="ygi:flex ygi:shrink-0 ygi:cursor-pointer ygi:items-center ygi:justify-center ygi:p-1.5"
							aria-label="닫기"
						>
							<XIcon size={10} className="ygi:text-text-primary" />
						</button>
					</Dialog.Close>
				</div>
				<p className="ygi:body-14-md ygi:text-text-secondary ygi:whitespace-pre-line">
					{`입력해주신 지역을 참고해서 더 좋은 맛집을\n추천해드릴게요.`}
				</p>
			</div>
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="예) 성수동, 이태원, 제주 애월읍"
				maxLength={MAX_LENGTH}
				showClearButton
				onClear={() => setValue("")}
			/>
			<Button
				type="button"
				variant="primary"
				width="full"
				disabled={value.trim().length === 0}
				onClick={handleSubmit}
			>
				입력 완료
			</Button>
		</div>
	);
};
