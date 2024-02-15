// @TODO: 페이지 전환 애니메이션 추가하기

import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { icons } from '../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../interfaces'
import Button from '@mui/material/Button'
import AlarmItem from './AlarmItem'
import { useAlarmQuery } from '../../hooks/useAlarm'
import { useMutation } from '@tanstack/react-query'
import { updateAllRead } from './api'
import { IAlarm } from './alarm'
import { useEffect, useState } from 'react'

const AlarmPage = () => {
	const navigate = useNavigate()
	const mutation = useMutation({ mutationFn: updateAllRead })
	const [readAll, setReadAll] = useState<boolean>(false)

	const { data: alarms } = useAlarmQuery()
	const menu: IMenu = {
		left: icons.BACK,
		center: '알림',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate("/"),
		right_func: undefined,
	}

	const deleteAllAlarms = async() => {
		await mutation.mutate(undefined, {
			onSuccess: () => {
				console.log('success')
					setReadAll(prev => !prev);
				
			}
	});
	}

	useEffect(() => {
		console.log("다 읽음", readAll)
	}, [readAll])

	return (
		<div className="w-full">
			<Header menu={menu} func={func} />
			<div className="h-screen mt-16 flex flex-col">
				{alarms &&
					alarms.alarmList.content.map((alarm: IAlarm) => (
						<AlarmItem alarm={alarm} readAll={readAll} key={alarm.alarmId} />
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
