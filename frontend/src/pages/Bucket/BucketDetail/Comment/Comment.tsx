import UserProfile from '../../../../components/UserProfile'
import { ICommentItem, TimeUnitType } from '../../../../interfaces'
import ActiveLikeButton from './ActiveLikeButton'
import UnActiveLikeButton from './UnActiveLikeButton'

const getTime = (time: number, timeUnit: TimeUnitType): string => {
	switch (timeUnit) {
		case 'min':
			return time > 0 ? `${time}분 전` : '방금 전'
		case 'hour':
			return time + '시간 전'
		case 'day':
			return time + '일 전'
		case 'month':
			return time + '달 전'
		case 'year':
			return time + '년 전'
		default:
			return '방금 전'
	}
}

interface ICommentProps {
	commentInfo: ICommentItem
}

const Comment = ({ commentInfo }: ICommentProps) => {
	return (
		<div className="relative flex flex-col">
			{/* //Todo: comment 유저로 정보 변경 필요 */}
			<UserProfile type="comment" userInfo={commentInfo.writer} />
			<p className="text-[10px] ml-11">{getTime(commentInfo.time, commentInfo.timeUnit)}</p>
			<p className="text-xs ml-11">{commentInfo.context}</p>

			<ActiveLikeButton />
			<UnActiveLikeButton />
		</div>
	)
}

export default Comment
