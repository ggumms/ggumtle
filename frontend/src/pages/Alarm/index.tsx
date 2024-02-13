// @TODO: 페이지 전환 애니메이션 추가하기

import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { icons } from '../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../interfaces'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { IAlarm } from '../Radar/types/alarm'
import AlarmItem from './AlarmItem'
import { useAlarmQuery } from '../../hooks/useAlarm'
import { useMutation } from '@tanstack/react-query'
import { updateAllRead } from './api'

// @TODO: 실제 api통신시에 remind는 dataId 받아와서 버킷 title 다시 post 요청보내기

const AlarmPage = () => {
	const navigate = useNavigate()
	const mutation = useMutation({ mutationFn: updateAllRead })
	// const [notifications, setNotifications] = useState<IAlarm[]>()

	const { data: alarms } = useAlarmQuery()
	console.log(alarms)
	const menu: IMenu = {
		left: icons.BACK,
		center: '알림',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate("/"),
		right_func: undefined,
	}

	const deleteAllAlarms = () => {
		// mutation.mutate()
		console.log("다 읽음")
	}

	return (
		<div className="w-full">
			<Header menu={menu} func={func} />
			<div className="h-screen mt-16 flex flex-col">
				{alarms &&
					alarms.alarmList.content.map((alarm: IAlarm) => (
						<AlarmItem alarm={alarm} key={alarm.alarmId} />
					))}
				<div className="fixed bottom-2 w-full flex justify-center">
					<Button color="primary" onClick={deleteAllAlarms} variant="contained">
						다 읽음 처리하기
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AlarmPage
