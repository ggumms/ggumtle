import { RouterProvider } from 'react-router-dom'
import router from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill';

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


useEffect(() => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let eventSource:any
	const fetchSse = async() => {
		try {

			const alarmConnectEndpoint = `${import.meta.env.VITE_BASE_URL}/api/alarm/subscribe`
			eventSource = new EventSourcePolyfill(alarmConnectEndpoint, {
				headers: {Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,}
			})
			
			eventSource.addEventListener('notify', (event: any) => {
				console.log("new notify", event.data)
			})
			
			eventSource.onerror = async (event: any) => {
				if (!event.error.message.includes("No activity"))
					eventSource.close();
			};
		} catch (error) {
			console.log(error)
		}
	}
	fetchSse()
	return () => eventSource.close();
	})

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</ThemeProvider>
	)
}

export default App
