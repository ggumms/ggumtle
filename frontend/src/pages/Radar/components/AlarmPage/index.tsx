// @TODO: 페이지 전환 애니메이션 추가하기

import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'
import { icons } from '../../../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../../../interfaces'
// import Button from '@mui/material-next/Button'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'
import { IAlarm } from '../../types/alarm'
import AlarmItem from './AlarmItem'

// 더미 데이터
const data: IAlarm[] = [
	{
		alarmId: 1,
		sender: 'juno',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 2,
		isRead: true,
		context: '10만이 엊그제 같은데',
		type: 'commentBucket',
		dataId: 3,
	},
	{
		alarmId: 2,
		sender: 'inhwa',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 2,
		isRead: false,
		context: null,
		type: 'follow',
		dataId: 3,
	},
	{
		alarmId: 3,
		sender: 'jihwan',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 2,
		isRead: true,
		context: null,
		type: 'likeCommentBucket',
		dataId: 3,
	},
	{
		alarmId: 4,
		sender: 'woosung',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 2,
		isRead: true,
		context: null,
		type: 'likeCommentReview',
		dataId: 3,
	},
	{
		alarmId: 5,
		sender: 'wonju',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 2,
		isRead: true,
		context: null,
		type: 'join',
		dataId: 3,
	},
	{
		alarmId: 6,
		sender: 'juno',
		senderProfileImage: 'url',
		timeUnit: 'hour',
		time: 5,
		isRead: true,
		context: '스카이다이빙 하기',
		type: 'remind',
		dataId: 89,
	},
	{
		alarmId: 7,
		sender: 'inhwa',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 0,
		isRead: true,
		context: '국토대장정 하기',
		type: 'bucket',
		dataId: 3,
	},
	{
		alarmId: 8,
		sender: 'wonju',
		senderProfileImage: 'url',
		timeUnit: 'month',
		time: 5,
		isRead: false,
		context: '네이버 크루가 되기까지',
		type: 'review',
		dataId: 3,
	},
	{
		alarmId: 10,
		sender: 'woos',
		senderProfileImage: 'url',
		timeUnit: 'hour',
		time: 1,
		isRead: false,
		context: '우와 축하드려요!! 저도 이렇게 될 수 있겠죠....? 노력하신거 보니까 저도 자극을 받네요',
		type: 'commentReview',
		dataId: 3,
	},
	{
		alarmId: 9,
		sender: 'juno',
		senderProfileImage: 'url',
		timeUnit: 'min',
		time: 20,
		isRead: true,
		context: null,
		type: 'bucketAchieve',
		dataId: 3,
	},
]
// @TODO: 실제 api통신시에 remind는 dataId 받아와서 버킷 title 다시 post 요청보내기

const AlarmPage = () => {
	const navigate = useNavigate()
	const [notifications, setNotifications] = useState<IAlarm[]>(data)

	const menu: IMenu = {
		left: icons.BACK,
		center: '알림',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate(-1),
		right_func: undefined,
	}

	const deleteAllAlarms = () => {
		setNotifications(notifications.map((alarm: IAlarm) => ({ ...alarm, isRead: true })))
	}

	useEffect(() => {
		deleteAllAlarms
	}, notifications)

	return (
		<div className="w-full">
			<Header menu={menu} func={func} />
			<div className="h-screen mt-14 flex flex-col">
				{notifications.length &&
					notifications.map((alarm: IAlarm) => <AlarmItem alarm={alarm} key={alarm.alarmId} />)}
				<div className="fixed bottom-2 w-full flex justify-center">
					<Button
						color="primary"
						onClick={deleteAllAlarms}
						variant="contained"
					>
						다 읽음 처리하기
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AlarmPage
