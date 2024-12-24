/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: "hsl(219, 15%, 18%)",
			},
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

				"bounce-arrow": {
					"0%, 100%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
					},
					"50%": {
						transform: "translateY(25%)",
						animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
					},
				},
			},
			animation: {
				"ping-custom":
					"ping-custom 4s cubic-bezier(0, 0, 0.2, 1) infinite",
				"bounce-arrow": "bounce-arrow 1s infinite",
			},
		},
	},
};
