/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [require('@tailwindcss/forms')],
	theme: {
		screens: {
			"tb": "800px",
			"xxl": "1500px"
		},
		extend: {
			fontFamily: {
				'proxima': ['Proxima Soft', 'sans-serif']

			},

			animation: {
				blink: "blink 2s ease-in-out infinite",
				flasharrow: "flasharrow 0.5s linear forwards",
				show: "show 300ms linear forwards",
				hide: "hide 1ms 1s linear forwards",
				svganim: "svganim 0.53s ease-in forwards",
				doneText: "doneText 0.8s 1.3s linear forwards",
				boxNot: "svganim 1.6s cubic-bezier(.9, .0, .5, 1) forwards",
				boxYes: "boxYes 1.6s cubic-bezier(.9, .0, .5, 1) forwards",
				lineDone: "svganim 0.5s 1.6s cubic-bezier(.9,.0,.5,1) forwards",
				circleDone: "circleDone 6s cubic-bezier(.9,.0,.5,1) infinite",
				signDone: "svganim 0.6s 1.3s cubic-bezier(.9,.0,.5,1) forwards",
				space: "space steps(19) 0.33s infinite",
				slide: "slide 5s infinite linear",
				blob: "blob 7s infinite",
				runningDragon: "run 1s linear infinite"

			},

			keyframes: {
				slide: {
					'48%': { transform: 'translateX(-50%)' },
					'50%': { transform: 'rotateY(180deg)' },
					'100%': { transform: 'translateX(0%)' },

				},
				run: {
					'0%': { transform: 'translateX(0%) rotateY(-180deg)' },
					'25%': { transform: 'translateX(100%) rotateY(-180deg)' },
					'50%': { transform: 'translateX(100%) rotateY(0deg)' },
					'75%': { transform: 'translateX(0%) rotateY(0deg)' },
					'100%': { transform: 'translateX(0%) rotateY(-180deg)' },
				},




				blob: {
					"0%": {
						transform: "translate(0px, 0px) scale(1)",
					},
					"33%": {
						transform: "translate(30px, -50px) scale(1.1)",
					},
					"66%": {
						transform: "translate(-20px, 20px) scale(0.9)",
					},
					"100%": {
						transform: "tranlate(0px, 0px) scale(1)",
					}
				},
				blink: {
					"0%": {
						opacity: 1
					},
					"50%": {
						opacity: 0
					},
					"100%": {
						opacity: 1
					}
				},
				flasharrow: {
					"0%": {
						opacity: 1,
					},
					"100%": {
						opacity: 0
					}
				},
				hide: {
					"100%": {
						height: 0,
						opacity: 0
					}
				},
				show: {
					"100%": {
						"visibility": "visible"
					}
				},
				svganim: {
					"100%": {
						strokeDashoffset: 0
					}
				},
				boxYes: {
					"100%": {
						strokeDashoffset: 62
					}
				},
				doneText: {
					"100%": {
						color: "rgb(124, 58, 237)",
						opacity: 0.6
					}
				},
				circleDone: {
					"0%": {
						transform: "scale(1)"
					},
					"50%": {
						transform: "scale(1.5)"
					},
					"100%": {
						transform: "scale(1)"
					}
				},
				space: {
					"0%": {
						backgroundPosition: "0% 5%"
					},
					"100%": {
						backgroundPosition: "100% 5%"
					}
				}
			}
		},
	},


}
