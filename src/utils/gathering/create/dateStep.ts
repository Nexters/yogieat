import { parse, isValid, startOfDay, isBefore } from "date-fns";
import { DATE_PATTERN } from "#/constants/gathering/create";

/**
 * 날짜 입력값을 yyyy.mm.dd 형식으로 포맷팅합니다.
 * 숫자만 입력받아 자동으로 점(.)을 추가하고, 유효하지 않은 입력을 필터링합니다.
 */
export const formatDateInput = (value: string): string => {
	const rawDigits = value.replace(/\D/g, "");
	let digits = "";

	for (let i = 0; i < rawDigits.length && digits.length < 8; i++) {
		const char = rawDigits[i];
		const pos = digits.length;

		// 연도 첫 자리 (0번 위치): 0 불가
		if (pos === 0 && char === "0") {
			continue;
		}

		// 월 첫 자리 (4번 위치): 0, 1만 허용
		if (pos === 4 && char !== "0" && char !== "1") {
			continue;
		}

		// 월 둘째 자리 (5번 위치)
		if (pos === 5) {
			const monthFirst = digits[4];
			// 0X: 1-9만 허용 (01-09)
			if (monthFirst === "0" && char === "0") {
				continue;
			}
			// 1X: 0-2만 허용 (10-12)
			if (monthFirst === "1" && Number(char) > 2) {
				continue;
			}
		}

		// 일 첫 자리 (6번 위치): 0, 1, 2, 3만 허용
		if (pos === 6 && Number(char) > 3) {
			continue;
		}

		// 일 둘째 자리 (7번 위치)
		if (pos === 7) {
			const dayFirst = digits[6];
			// 0X: 1-9만 허용 (01-09)
			if (dayFirst === "0" && char === "0") {
				continue;
			}
			// 3X: 0-1만 허용 (30-31)
			if (dayFirst === "3" && Number(char) > 1) {
				continue;
			}
		}

		digits += char;
	}

	if (digits.length <= 4) {
		return digits;
	}

	if (digits.length <= 6) {
		return `${digits.slice(0, 4)}.${digits.slice(4)}`;
	}

	return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
};

const DATE_FORMAT = "yyyy.MM.dd";

/**
 * 날짜 문자열이 유효한 형식인지 검사합니다.
 * yyyy.MM.dd 패턴과 실제 존재하는 날짜인지 확인하며,
 * 오늘 날짜 이전은 선택할 수 없습니다.
 */
export const isValidDateFormat = (value: string): boolean => {
	if (!DATE_PATTERN.test(value)) {
		return false;
	}

	const parsedDate = parse(value, DATE_FORMAT, new Date());

	if (!isValid(parsedDate)) {
		return false;
	}

	const today = startOfDay(new Date());

	if (isBefore(parsedDate, today)) {
		return false;
	}

	return true;
};
