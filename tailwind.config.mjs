const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lato", ...defaultTheme.fontFamily.sans],
				serif: ["Literata", ...defaultTheme.fontFamily.serif],
			  },
		},
	},
	plugins: [],
}
