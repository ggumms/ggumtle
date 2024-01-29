import { RouterProvider } from 'react-router-dom'
import router from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function App() {
	const theme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 20, // 원하는 border-radius 값으로 변경
					},
				},
			},
		},
		palette: {
			primary: {
				main: '#454645', // 원하는 primary 색상 코드로 변경
			},
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	)
}

export default App
