import { useNavigate } from 'react-router-dom'
import { AlarmMainMSG, AlarmSubMSG } from '../../constants/alarmMessage'
import { randomProfile } from '../../constants/randomProfile'
import Desc from './Desc'
import { IAlarm, TimeUnitType } from './alarm'
import { postReadOneAlarm } from './api'
import { useMutation } from '@tanstack/react-query'
import { useMyInfoQuery } from '../../hooks/useMyInfo'

export const AlarmMSG = (alarm: IAlarm) => {
	const {data: myinfo} = useMyInfoQuery()
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
				<Desc main1={myinfo?.userNickname} main2={AlarmMainMSG.JOIN} sub={AlarmSubMSG.JOIN} date={date} />
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
					sub={alarm.context}
					// sub={AlarmSubMSG.BUCKET}
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
		case 'commentBucket':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.COMMENT_BUCKET}
					sub={`"${alarm.context}"`}
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
		case 'likeCommentReview':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.COMMENT_LIKE_REVIEW}
					sub={null}
					date={date}
				/>
			)
		case 'likeCommentBucket':
			return (
				<Desc
					main1={alarm.sender}
					main2={AlarmMainMSG.COMMENT_LIKE_BUCKET}
					sub={null}
					date={date}
				/>
			)
	}
}

const AlarmItem = ({ alarm, readAll }: { alarm: IAlarm, readAll: boolean }) => {

	const navigate = useNavigate()
	const mutation = useMutation({ mutationFn: postReadOneAlarm })
	const handleClickAlarm = () => {
		mutation.mutate({alarmId: alarm.alarmId})
		if(mutation.isSuccess) {
			console.log(mutation.data, "success")
		} else console.log("else")

		console.log("handle", readAll)
		switch(alarm.type) {
			case 'follow':
					navigate(`/user/${alarm.dataId}`);
					break;
			case 'join':
					navigate(`/mypage`);
					break;
			case 'bucketReaction':
			case 'remind':
			case 'followBucket':
			case 'followBucketAchieve':
			case 'commentBucket':
			case 'likeCommentBucket':
					navigate(`/bucket/${alarm.dataId}`);
					break;
			case 'reviewReaction':
			case 'followReview':
			case 'commentReview':
			case 'likeCommentReview':
					navigate(`/review/${alarm.dataId}`);
					break;
			default:
					break;
	}
	}
	return (
		<div
			onClick={() => handleClickAlarm()}
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
			<div className="w-[90%] px-2">{AlarmMSG(alarm)}</div>
		</div>
	)
}

// Link to url
// 	| 'follow' => user/usreId
// 	| 'bucketReaction' => bucket/bucketId
// 	| 'reviewReaction' => review/reviewId
// 	| 'join' => mypage 
// 	| 'remind' => bucket/bucketId
// 	| 'followBucket' => bucket/bucketId
// 	| 'followBucketAchieve' => bucket/bucketId
// 	| 'followReview' => review/reviewId
// 	| 'commentBucket' => bucket/bucketId
// 	| 'commentReview' => review/reviewId
// 	| 'likeCommentReview' => review/reviewId
// 	| 'likeCommentBucket' => bucket/bucketId

export default AlarmItem
