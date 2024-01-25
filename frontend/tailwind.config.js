/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				transform: {
					'0%, 100%': { borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' },
					'14%': { borderRadius: '40% 60% 54% 46% / 49% 60% 40% 51%' },
					'28%': { borderRadius: '54% 46% 38% 62% / 49% 70% 30% 51%' },
					'42%': { borderRadius: '61% 39% 55% 45% / 61% 38% 62% 39%' },
					'56%': { borderRadius: '61% 39% 67% 33% / 70% 50% 50% 30%' },
					'70%': { borderRadius: '50% 50% 34% 66% / 56% 68% 32% 44%' },
					'84%': { borderRadius: '46% 54% 50% 50% / 35% 61% 39% 65%' },
				},
				movement: {
					'0%, 100%': { transform: 'none' },
					'50%': { transform: 'translateY(20%) rotateY(10deg)' },
				},
			},
			animation: {
				transform: 'transform 10s ease-in-out infinite both alternate',
				movement: 'movement 40s ease-in-out infinite both',
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
	},

	plugins: [],
}
