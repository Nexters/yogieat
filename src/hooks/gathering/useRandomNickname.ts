import { useCallback, useRef, useState } from "react";

import { RANDOM_NICKNAMES } from "#/constants/nickname";

const shuffle = <T>(arr: T[]): T[] => {
	const result = [...arr];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
};

const createInitialPool = () => shuffle([...RANDOM_NICKNAMES]);

export const useRandomNickname = () => {
	// 초기 풀은 모듈 스코프 함수로 생성하여 렌더 시점 ref 접근 없이 초기화
	const initialPool = createInitialPool();
	const initialNicknameValue = initialPool[0];

	const poolRef = useRef<string[]>(initialPool);
	const indexRef = useRef(1);
	const lastUsedRef = useRef<string>(initialNicknameValue);

	const [initialNickname] = useState<string>(initialNicknameValue);

	const getNextNickname = useCallback((): string => {
		if (indexRef.current >= poolRef.current.length) {
			let newPool = shuffle([...RANDOM_NICKNAMES]);
			// 재셔플 시 마지막 사용 닉네임이 첫 번째가 되는 것 방지
			if (
				lastUsedRef.current !== null &&
				newPool[0] === lastUsedRef.current &&
				newPool.length > 1
			) {
				const [first, ...rest] = newPool;
				newPool = [...rest, first];
			}
			poolRef.current = newPool;
			indexRef.current = 0;
		}

		const nickname = poolRef.current[indexRef.current];
		indexRef.current += 1;
		lastUsedRef.current = nickname;
		return nickname;
	}, []);

	return {
		initialNickname,
		getNextNickname,
	};
};
