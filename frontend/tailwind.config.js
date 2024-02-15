import typography from '@tailwindcss/typography'
import colorPalette from './src/constants/colorPallet'

/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			// css 가상 요소를 사용하기 위한 설정 추가
			content: {
				pictureImage: 'url("/src/assets/svgs/pictureImage.svg")',
				calendarImage: 'url("/src/assets/svgs/calendarImage.svg")',
				clockImage: 'url("/src/assets/svgs/clockImage.svg")',
				likeImage: 'url("/src/assets/svgs/heart.svg")',
			},
			colors: colorPalette,
			keyframes: {
				// radar: {
				// 	'0%, 100%': {
				// 		borderColor: '#FF98B7',
				// 	},
				// 	'20%': {
				// 		borderColor: '#F7B578',
				// 	},
				// 	'40%': {
				// 		borderColor: '#8DC788',
				// 	},
				// 	'60%': {
				// 		borderColor: '#A4BCF6',
				// 	},
				// 	'80%': {
				// 		borderColor: '#C39DF9',
				// 	},
				// },
				radar: {
					from: {
						borderColor: '#c6c6c661',
					},
					to: {
						borderColor: '#F7B578',
						// borderColor: '#4646467a',
					},
				},
				floating: {
					'0%, 100%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					},
				},
				floatingBg: {
					'0%, 100%': {
						transform: 'translateY(-5px)',
					},
					'50%': {
						transform: 'translateY(0px)',
					},
				},
				// floatingBg1: {
				// 	'0%, 100%': {
				// 		transform: 'translate(-5px, 0px)',
				// 	},
				// 	'25%': {
				// 		transform: 'translate(0px, 5px)',
				// 	},
				// 	'50%': {
				// 		transform: 'translate(5px, 0px)',
				// 	},
				// 	'75%': {
				// 		transform: 'translate(0px, -5px)',
				// 	},
				// },
				// floatingBg2: {
				// 	'0%, 100%': {
				// 		transform: 'translate(0px, -5px)',
				// 	},
				// 	'25%': {
				// 		transform: 'translate(5px, 0px)',
				// 	},
				// 	'50%': {
				// 		transform: 'translate(0px, 5px)',
				// 	},
				// 	'75%': {
				// 		transform: 'translate(-5px, 0px)',
				// 	},
				// },
				slideLeft: {
					'0%': { left: '100%', transform: 'translate(-100%, -50%)' },
					'100%': { left: '50%', transform: 'translate(-50%, -50%)' },
				},
				fadeIn: {
					'0%': {
						opacity: 0.8,
						transform: 'scale(0.95)',
					},
					'70%': {
						opacity: 1,
						transform: 'scale(1.1)',
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)',
					},
				},
				rotate: {
					'0%, 100%': { transform: 'translate(0px, 0px)' },
					'50%': { transform: 'translate(-10px, -10px)' },
				},
			},
		},
		// animation: slideLeft 2s ease-in-out infinite;
		animation: {
			radar1: '2s linear 1s infinite alternate radar',
			radar2: '2s linear 2s infinite alternate radar',
			radar3: '2s linear 3s infinite alternate radar',
			floating: '2.5s infinite ease-in-out floating',
			floatingBg: '2.5s infinite ease-in-out floatingBg',
			floatingBg1: '4s infinite ease-in floatingBg1',
			floatingBg2: '4s infinite ease-in floatingBg2',
			sliceIn: '2s ease-in-out infinite',
			fadeIn: '0.3s ease-in-out fadeIn',
			rotate: '4s ease-in-out infinite',
		},
	},
	plugins: [typography],
}
