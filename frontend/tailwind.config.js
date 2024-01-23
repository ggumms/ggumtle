/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				radar: {
					from: {
						borderColor: '#c6c6c661',
					},
					to: {
						borderColor: '#4646467a',
					},
				},
			},
		},
		animation: {
			radar1: '1.5s linear 1s infinite alternate radar',
			radar2: '1.5s linear 2s infinite alternate radar',
			radar3: '1.5s linear 3s infinite alternate radar',
		},
	},
	colors: {
		// Mono Colors
		point1: '#454645',
		unActive: '#D9D9D9',

		// Main Colors
		green: '#52A88C',
		lightGreen: '#8DC788',
		red: '#C22823',
		yellow: '#FFCE31',
		lemon: '#FDF5B4',
		orange: '#F7B578',
		skyBlue: '#A4BCF6',
		purple: '#C39DF9',
		black: '#454645',
		beige: '#CDBC8A',
		sandPink: '#EEA08E',
		brown: '#C7927A',
	},
	plugins: [],
}
