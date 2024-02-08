import { ChangeEvent, MouseEvent, useState } from 'react'
import UserProfile from '../../../../components/UserProfile'
import { ICommentItem, TimeUnitType } from '../../../../interfaces'
import ActiveLikeButton from './ActiveLikeButton'
import ShowMoreButton from './ShowMoreButton'
import UnActiveLikeButton from './UnActiveLikeButton'
import { useDetailPageTypeStore } from '../../../../store/detailStore'

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
	type: 'read' | 'edit'
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
}

const Comment = ({ commentInfo, type, setSelectedId }: ICommentProps) => {
	const { setPageType } = useDetailPageTypeStore()
	const [editText, setEditText] = useState('')

	// handler about Comment
	// Todo: handleChangeCommit으로 함수명 변경, edit 관련 함수가 너무 많아서 이름을 명시적으로 변경
	const handleEditComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const inputText = event.currentTarget.value
		setEditText(inputText)
	}
	// 이벤트 버블링을 이용한 이벤트 동작 수행
	const handleClickComment = (event: MouseEvent<HTMLDivElement>) => {
		const { id } = event.currentTarget.dataset
		id && setSelectedId(parseInt(id))
	}

	// handler about ShowMoreButton
	const handleCancelEdit = () => {
		setEditText('')
		setPageType('read')
	}
	const handleCompleteEdit = () => {
		// Todo: 댓글 수정 Api 적용 예정
		setPageType('read')
	}
	return (
		<div onClick={handleClickComment} data-id={commentInfo.id} className="relative flex flex-col">
			{/* //Todo: comment 유저로 정보 변경 필요 */}
			<UserProfile type="comment" userInfo={commentInfo.writer} />
			<p className="text-[10px] ml-11">{getTime(commentInfo.time, commentInfo.timeUnit)}</p>
			{type === 'read' ? (
				<p className="text-xs ml-11">{commentInfo.context}</p>
			) : (
				<div className="border-[1px] rounded-md border-gray ml-11 mr-7 mt-1 p-2">
					<textarea
						placeholder={commentInfo.context}
						value={editText}
						onChange={handleEditComment}
						className="w-full text-sm resize-none focus:outline-none"
					/>
					<div className="flex justify-end gap-3 text-point1">
						<button onClick={handleCancelEdit}>취소</button>
						<button onClick={handleCompleteEdit}>완료</button>
					</div>
				</div>
			)}

			<ActiveLikeButton />
			<UnActiveLikeButton />
			<ShowMoreButton />
		</div>
	)
}

export default Comment
