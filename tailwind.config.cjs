/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				beige: {
					50: "#F3E5D1",
					100: "#E9D9C2",
					200: "#DAC5A7",
					300: "#C7B190",
					400: "#AF9D83",
					500: "#96846C",
					600: "#685943",
					700: "#5A5141",
					800: "#433C32",
					900: "#1F1D17",
					950: "#12100D",
				},
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
				serif: ["Linden Hill", "serif"],
			},
		},
	},
	plugins: [],
};
