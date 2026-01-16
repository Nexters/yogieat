/**
 * @type {import("prettier").Config}
 */
const config = {
	trailingComma: 'all',
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	plugins: [
		"prettier-plugin-tailwindcss"
	],
	tailwindFunctions: ["cva", "twMerge"],
	tailwindPreserveWhitespace: true,
	tailwindPreserveDuplicates: true,
};

export default config;
