import { Link } from 'react-router-dom'
import { AlarmMainMSG, AlarmSubMSG } from '../../constants/alarmMessage'
import { randomProfile } from '../../constants/randomProfile'
import { IAlarm, TimeUnitType } from '../Radar/types/alarm'
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
		case 'bucketReaction':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.LIKE_COMMENT_BUCEKT}
					sub={AlarmSubMSG.LIKE_COMMENT}
					date={date}
				/>
			)
		case 'reviewReaction':
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
		case 'followBucket':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.BUCKET}
					sub={AlarmSubMSG.BUCKET}
					date={date}
				/>
			)
		case 'followReview':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.REVIEW}
					sub={`"${alarm.context}"`}
					date={date}
				/>
			)
		case 'followBucketAchieve':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.BUCKET_ACHIEVE}
					sub={AlarmSubMSG.BUCKET_ACHIEVE}
					date={date}
				/>
			)
		case 'followCommentReview':
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

// likeCommentBucket, remind, followBucket, followBucketAchieve, commentBucket, join, likeCommentReview, followReview, followCommentReview, bucketReaction, reviewReaction

// | 'follow' -> 사용자 페이지
//'bucketReaction' -> 버킷 상세 페이지
//'reviewReaction' -> 후기 상세 페이지
//'join' -> 마이페이지
//'remind' -> 버킷 상세 페이지 (후기?)
//'followBucket' -> 버킷 상세 페이지
//'followReview' -> 후기 상세 페이지
//'followBucketAchieve' -> 후기 상세 페이지
//'followCommentReview' -> 후기 상세 페이지
//'commentBucket'-> 

const AlarmItem = ({ alarm }: { alarm: IAlarm }) => {
	const handleClickAlarm = () => {
		
	}
	return (
		<Link
			to="/"
			onClick={handleClickAlarm}
			className={`px-5 py-2 w-full flex items-center ${alarm.isRead && 'bg-[#f3f3f3]'}`}
		>
			<div>
				{alarm &&
					(alarm.senderProfileImage ? (
						<div className="w-16 h-16 overflow-hidden rounded-full">
							<img src={alarm.senderProfileImage} alt="유저 프로필" />
						</div>
					) : (
						randomProfile[0]
					))}
			</div>
			<div className="w-[90%] px-2">{getAlarmMsg(alarm)}</div>
		</Link>
	)
}

export default AlarmItem
