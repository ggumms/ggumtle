/* eslint-disable @typescript-eslint/no-explicit-any */
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

	// function notifyMe() {
	// 	if (!("Notification" in window)) {
	// 		// Check if the browser supports notifications
	// 		alert("This browser does not support desktop notification");
	// 	} else if (Notification.permission === "granted") {
	// 			// Check whether notification permissions have already been granted;
	// 			// if so, use service worker to create a notification
	// 			console.log("granded===")
	// 			navigator.serviceWorker.ready.then(function(registration) {
	// 					registration.showNotification("Hi there!", {
	// 							body: "You have a new notification!",
	// 							icon: '/public/icons/icon-200.png'
	// 					});
	// 			});
	// 	} else if (Notification.permission !== "denied") {
	// 			// We need to ask the user for permission
	// 			Notification.requestPermission().then(function(permission) {
	// 					// If the user accepts, let's create a notification using service worker
	// 					if (permission === "granted") {
	// 							navigator.serviceWorker.ready.then(function(registration) {
	// 									registration.showNotification("Hi there!", {
	// 											body: "You have a new notification!",
	// 											icon: '/public/icons/icon-200.png'
	// 									});
	// 							});
	// 					}
	// 			});
	// 	}
	// }
useEffect(() => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let eventSource:any
	const fetchSse = async() => {
		try {

			const alarmConnectEndpoint = `${import.meta.env.VITE_BASE_URL}alarm/subscribe`
			eventSource = new EventSourcePolyfill(alarmConnectEndpoint, {
				headers: {Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,}
			})
			eventSource.onopen = (event: any) => {
				console.log('SSE 연결이 열렸습니다.', event);
			};
			
			eventSource.addEventListener('serverEvent', async(event: any) => {
				console.log(event.data, "알림이 왔어요 serverEvent")
				const message = event.data;
				console.log("=======새로운 알림 도착:", JSON.parse(message), '파싱');
				// notifyMe()
			})
			eventSource.onerror = async (event: any) => {
				if (!event.error.message.includes("No activity"))
				console.log("close")
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
