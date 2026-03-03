import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	prettierConfig,
	{
		plugins: {
			prettier,
			perfectionist,
		},
		rules: {
			"perfectionist/sort-imports": [
				"error",
				{
					type: "natural",
					order: "asc",
					groups: [
						"builtin",
						"external",
						"internal",
						["parent", "sibling", "index"],
					],
					internalPattern: ["^#/.*"],
				},
			],
			"perfectionist/sort-named-imports": [
				"error",
				{
					type: "natural",
					order: "asc",
				},
			],
			"perfectionist/sort-named-exports": [
				"error",
				{
					type: "natural",
					order: "asc",
				},
			],
			"perfectionist/sort-exports": [
				"error",
				{
					type: "natural",
					order: "asc",
				},
			],
		},
	},
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
