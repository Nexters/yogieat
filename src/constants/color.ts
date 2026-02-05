/**
 * @fileoverview Auto-generated Color Tokens
 *
 * 이 파일은 scripts/colors/generate.js에 의해 자동 생성됩니다.
 * 직접 수정하지 마세요. 수정 사항은 스크립트 실행 시 덮어씌워집니다.
 *
 * @generated
 * @see scripts/colors/generate.js
 *
 * @description
 * src/styles/color.css에서 정의된 디자인 토큰을 TypeScript에서 사용할 수 있도록
 * 변환한 상수입니다. Tailwind 유틸리티 클래스 대신 직접 색상 값이 필요한 경우 사용합니다.
 *
 * @example 기본 사용법
 * ```tsx
 * import { colors } from "#/constants/color";
 *
 * // Semantic 토큰 사용 (권장)
 * <div style={{ color: colors.text.primary }}>텍스트</div>
 * <div style={{ backgroundColor: colors.surface.primary }}>배경</div>
 *
 * // Palette 토큰 사용 (특수한 경우에만)
 * <div style={{ borderColor: colors.palette.gray[300] }}>테두리</div>
 * ```
 *
 * @example 조건부 스타일링
 * ```tsx
 * const getBorderColor = (isError: boolean) =>
 *   isError ? colors.border.primary : colors.border.default;
 * ```
 *
 * @important
 * - 가능하면 Tailwind 유틸리티 클래스(ygi:text-text-primary)를 우선 사용하세요.
 * - 동적 스타일링이나 JS에서 색상 값이 필요한 경우에만 이 모듈을 사용하세요.
 * - Palette 토큰보다 Semantic 토큰 사용을 권장합니다. (디자인 일관성 유지)
 */

export const colors = {
	/**
	 * Palette Colors (기본 색상 팔레트)
	 *
	 * @description
	 * 디자인 시스템의 기본 색상 값입니다.
	 * 가능하면 semantic 토큰을 사용하고, palette는 특수한 경우에만 직접 참조하세요.
	 *
	 * @example
	 * colors.palette.gray[500]    // "#6b7280"
	 * colors.palette.primary[500] // "#ff5a3c"
	 */
	palette: {
		common: {
			black: "#000000",
			white: "#ffffff",
		},
		gray: {
			"50": "#f9fafb",
			"100": "#f3f4f6",
			"200": "#e5e7eb",
			"300": "#d1d5db",
			"400": "#9ca3af",
			"500": "#6b7280",
			"600": "#4b5563",
			"700": "#374151",
			"800": "#1f2933",
			"900": "#111827",
		},
		primary: {
			"50": "#ffedea",
			"100": "#ffd1c9",
			"200": "#ffab9e",
			"300": "#ff7f6b",
			"400": "#ff654e",
			"500": "#ff5a3c",
			"600": "#f2472a",
			"700": "#d93a20",
			"800": "#b82f1a",
			"900": "#912416",
		},
		secondary: {
			"50": "#ecf6ff",
			"100": "#d6ecff",
			"200": "#add9ff",
			"300": "#7fc3ff",
			"400": "#66b9ff",
			"500": "#53b7ff",
			"600": "#3ca9ff",
			"700": "#1f94f2",
			"800": "#1678cc",
			"900": "#115c99",
		},
		green: {
			"100": "#ddf9ef",
			"300": "#7eecc4",
			"500": "#25dc96",
			"700": "#16b77b",
			"900": "#0f8a5c",
		},
		yellow: {
			"100": "#fff6bf",
			"300": "#ffee7d",
			"500": "#ffe731",
			"700": "#ffd52f",
			"900": "#ffbb00",
		},
		opacity: {
			gray: {
				"2": "rgba(31, 41, 51, 0.02)",
				"4": "rgba(31, 41, 51, 0.04)",
				"8": "rgba(31, 41, 51, 0.08)",
				"16": "rgba(31, 41, 51, 0.16)",
				"50": "rgba(31, 41, 51, 0.5)",
				"80": "rgba(31, 41, 51, 0.8)",
			},
			primary: {
				"80": "rgba(255, 90, 60, 0.8)",
			},
		},
	},
	bg: {
		white: "#ffffff",
		gray: "#f3f4f6",
		website: "#e5e7eb",
		dim: "rgba(31, 41, 51, 0.16)",
	},
	surface: {
		white: "#ffffff",
		primary: "#ffedea",
		secondary: "#ecf6ff",
		lightgray: "#f9fafb",
		gray: "#f3f4f6",
		disabled: "#f9fafb",
		active: "#ff5a3c",
		dark: "#1f2933",
	},
	text: {
		primary: "#111827",
		secondary: "#6b7280",
		disabled: "#d1d5db",
		inverse: "#ffffff",
		inverseSecondary: "#f9fafb",
		placeholder: "#9ca3af",
		interactive: "#ff5a3c",
	},
	border: {
		default: "#e5e7eb",
		primary: "#ff5a3c",
		primaryOpacity: "rgba(255, 90, 60, 0.8)",
		secondary: "#53b7ff",
		inverse: "#ffffff",
	},
	icon: {
		default: "#6b7280",
		disabled: "#9ca3af",
		strong: "#1f2933",
		inverse: "#ffffff",
	},
	button: {
		primary: "#1f2933",
		primaryHover: "#111827",
		primaryDisabled: "#9ca3af",
		secondary: "#ff5a3c",
		secondaryHover: "#f2472a",
		secondaryDisabled: "#ffab9e",
		tertiary: "#f3f4f6",
		tertiaryHover: "#e5e7eb",
		tertiaryDisabled: "#f9fafb",
		inverse: "#ffffff",
		inverseHover: "#f9fafb",
		inverseDisabled: "#f3f4f6",
	},
} as const;

/** 전체 colors 객체의 타입 */
export type Colors = typeof colors;

/** Palette 색상 타입 */
export type PaletteColors = typeof colors.palette;

/** Background 색상 타입 */
export type BgColors = typeof colors.bg;

/** Surface 색상 타입 */
export type SurfaceColors = typeof colors.surface;

/** Text 색상 타입 */
export type TextColors = typeof colors.text;

/** Border 색상 타입 */
export type BorderColors = typeof colors.border;

/** Icon 색상 타입 */
export type IconColors = typeof colors.icon;

/** Button 색상 타입 */
export type ButtonColors = typeof colors.button;
