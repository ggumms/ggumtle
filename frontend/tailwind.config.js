/** @type {import('tailwindcss').Config} */

const colorPalette = {
	// Mono Colors
	point1: '#454645',
	unActive: '#D9D9D9',
	lightGray: '#F6F6F6',
	subText: '#ACADAD',
	inputBg: '#F8F8F8',

	// Main Colors
	green: '#52A88C',
	lightGreen: '#8DC788',
	red: '#FA5853',
	yellow: '#FFDF85',
	pink: '#FF98B7',
	mint: '#AAD4D4',
	orange: '#F7B578',
	skyBlue: '#A4BCF6',
	purple: '#C39DF9',
	beige: '#CDBC8A',
	sandPink: '#EEA08E',
	brown: '#C7927A',
}

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			content: {
				pictureImage: 'url("/src/assets/svgs/pictureImage.svg")',
			},
			colors: colorPalette,
			keyframes: {
				radar: {
					from: {
						borderColor: '#c6c6c661',
					},
					to: {
						borderColor: '#4646467a',
					},
				},
				floating: {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					},
				},
				slideLeft: {
					'0%': { left: '100%', transform: 'translate(-100%, -50%)' },
					'100%': { left: '50%', transform: 'translate(-50%, -50%)' },
				},
			},
		},
		// animation: slideLeft 2s ease-in-out infinite;
		animation: {
			radar1: '1.5s linear 1s infinite alternate radar',
			radar2: '1.5s linear 2s infinite alternate radar',
			radar3: '1.5s linear 3s infinite alternate radar',
			floating: '2.5s infinite ease-in-out floating',
			sliceIn: '2s ease-in-out infinite',
		},
	},
	plugins: [],
}
