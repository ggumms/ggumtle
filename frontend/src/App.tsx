/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ToastContainer } from 'react-toastify';
import Toast from './pages/Alarm/Toast'
import 'react-toastify/dist/ReactToastify.css';
import Desc from './pages/Alarm/Desc'
import { AlarmMainMSG } from './constants/alarmMessage'
import { IAlarm, TimeUnitType } from './pages/Alarm/alarm'

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

			const alarmConnectEndpoint = `${import.meta.env.VITE_BASE_URL}/alarm/subscribe`
			eventSource = new EventSourcePolyfill(alarmConnectEndpoint, {
				headers: {Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,}
			})
			eventSource.onopen = (event: any) => {
				console.log('SSE 연결이 열렸습니다.', event);
			};
			
			eventSource.addEventListener('serverEvent', async(event: any) => {
				const notification: IAlarm = JSON.parse(event.data)
				console.log(notification, "알림이 왔어요 serverEvent")
				
				const date =
				notification.timeUnit === 'min' && notification.time === 0
					? '방금'
					: `${notification.time}${TimeUnitType[notification.timeUnit]} 전`
					
				const handleIntoDetail = () => {
					window.location.href = `/bucket/${notification.dataId}`
				}
				
				switch(notification.type) {
					case 'commentBucket':
						Toast.success(<Desc
							main1={notification.sender}
							main2={AlarmMainMSG.COMMENT_BUCKET}
							sub={`"${notification.context}"`}
							date={date}
						/>, {
							onClick:
							handleIntoDetail});
						break
					case 'remind':
						Toast.success(<Desc
							main1={'🔔 리마인드: '}
							main2={AlarmMainMSG.REMIND(notification.dataId)}
							sub={notification.context}
							date={date}
						/>, {
							onClick:
							handleIntoDetail});
						break

				}
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
			<ToastContainer position="top-center" />
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</ThemeProvider>
	)
}

export default App
