import { AlarmMainMSG, AlarmSubMSG } from '../../../../constants/alarmMessage'
import { IAlarm, TimeUnitType } from '../../types/alarm'
import Desc from './Desc'

const getAlarmMsg = (alarm: IAlarm) => {
	const date =
		alarm.timeUnit === 'min' && alarm.time === 0
			? '방금'
			: `${alarm.time}${TimeUnitType[alarm.timeUnit]} 전`

	switch (alarm.type) {
		case 'follow':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.FOLLOW}
					sub={AlarmSubMSG.FOLLOW}
					date={date}
				/>
			)
		case 'likeCommentBucket':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.LIKE_COMMENT_BUCEKT}
					sub={AlarmSubMSG.LIKE_COMMENT}
					date={date}
				/>
			)
		case 'likeCommentReview':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.LIKE_COMMENT_REVIEW}
					sub={AlarmSubMSG.LIKE_COMMENT}
					date={date}
				/>
			)
		case 'join':
			return (
				<Desc main1={alarm.sender} main2={AlarmMainMSG.JOIN} sub={AlarmSubMSG.JOIN} date={date} />
			)
		case 'remind':
			return (
				<Desc
					main1={'🔔 리마인드: '}
					main2={AlarmMainMSG.REMIND(alarm.dataId)}
					sub={alarm.context}
					date={date}
				/>
			)
		case 'bucket':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.BUCKET}
					sub={AlarmSubMSG.BUCKET}
					date={date}
				/>
			)
		case 'review':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.REVIEW}
					sub={`"${alarm.context}"`}
					date={date}
				/>
			)
		case 'bucketAchieve':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.BUCKET_ACHIEVE}
					sub={AlarmSubMSG.BUCKET_ACHIEVE}
					date={date}
				/>
			)
		case 'commentReview':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.COMMENT_REVIEW}
					sub={`"${alarm.context}"`}
					date={date}
				/>
			)
		case 'commentBucket':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.COMMENT_BUCKET}
					sub={`"${alarm.context}"`}
					date={date}
				/>
			)
	}
}
const AlarmItem = ({ alarm }: { alarm: IAlarm }) => {
	return (
		<div
			className={`px-5 py-2 flex gap-2 justify-between items-center ${alarm.isRead && 'bg-[#f3f3f3]'}`}
		>
			<div>
				{/* @TODO: alarm.senderProfileImage로 변경, null일 경우만 사용 */}
				<svg
					viewBox="0 0 36 36"
					fill="none"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					width="50"
					height="50"
				>
					<mask id=":rf:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
						<rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
					</mask>
					<g mask="url(#:rf:)">
						<rect width="36" height="36" fill="#987f69"></rect>
						<rect
							x="0"
							y="0"
							width="36"
							height="36"
							transform="translate(-5 9) rotate(189 18 18) scale(1)"
							fill="#fcd036"
							rx="36"
						></rect>
						<g transform="translate(-5 4.5) rotate(-9 18 18)">
							<path d="M13 |19 a1,0.75 0 0,0 10,0" fill="#000000"></path>
							<rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
							<rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
						</g>
					</g>
				</svg>
			</div>
			<div className="w-4/5 px-2">{getAlarmMsg(alarm)}</div>
			<div
				className={`w-[7px] h-[7px] rounded-full bg-[#E14246] ${alarm.isRead && 'invisible'}`}
			></div>
		</div>
	)
}

export default AlarmItem
