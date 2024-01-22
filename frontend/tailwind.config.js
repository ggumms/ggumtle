/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				text: '#454645',
				test: '#52A88C',
			},
		},
	},
	plugins: [],
}
