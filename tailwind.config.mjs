const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lato", ...defaultTheme.fontFamily.sans],
				serif: ["Literata Variable", ...defaultTheme.fontFamily.serif],
			  },
			  screens: {
				'xs': '480px',
				// => @media (min-width: 992px) { ... }
			  },
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			const newUtilities = {
				".opsz": {
					"font-variation-settings": '"opsz" 72',
				},
			};
			addUtilities(newUtilities);
		}),
	],
}
