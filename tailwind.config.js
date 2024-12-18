/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			keyframes: {
				"ping-custom": {
					"50%": {
						transform: "scale(1)",
						opacity: "1",
					},
					"75%, 100%": {
						transform: "scale(1.5)",
						opacity: "0",
					},
				},
			},
			animation: {
				"ping-custom":
					"ping-custom 4s cubic-bezier(0, 0, 0.2, 1) infinite",
			},
		},
	},
};
