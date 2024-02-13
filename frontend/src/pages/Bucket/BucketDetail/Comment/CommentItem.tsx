import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

import UserProfile from '../../../../components/UserProfile/UserProfile'
import ShowMoreButton from './ShowMoreButton'
import LikeButton from './LikeButton'

import { useDetailPageTypeStore } from '../../../../store/detailStore'
import { putBucketComment } from '../api'
import { ICommentItem, TimeUnitType } from '../../../../interfaces'

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

interface ICommentItemProps {
	commentInfo: ICommentItem
	type: 'read' | 'edit'
	selectedId: number | null
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
}

const CommentItem = ({ commentInfo, type, selectedId, setSelectedId }: ICommentItemProps) => {
	const { setPageType } = useDetailPageTypeStore()
	const [editText, setEditText] = useState(commentInfo.context)

	// 수정 버튼을 누르지 않고 댓글 클릭만 해도 수정 모드로 댓글이 띄워지는 문제 해결을 위한 코드
	useEffect(() => {
		setEditText(commentInfo.context)
		setPageType('read')
	}, [selectedId])

	// handler about Comment
	const handleChangeCommit = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
		setEditText(commentInfo.context)
		setPageType('read')
	}
	const handleCompleteEdit = async () => {
		const modifyRes = await putBucketComment(commentInfo.id, editText)
		if (modifyRes === 'success') {
			setPageType('read')
		}
	}

	// Todo : 자기 댓글이 아닐 때 이걸 판별해줘서 showMore 버튼이랑 좋아요 비활성화 버튼 안보이도록 처리 필요
	return (
		<div onClick={handleClickComment} data-id={commentInfo.id} className="relative flex flex-col">
			<UserProfile type="comment" userInfo={commentInfo.writer} isLoading={false} />
			<p className="text-[10px] ml-11 mb-1 mt-[2px] text-gray">
				{getTime(commentInfo.time, commentInfo.timeUnit)}
			</p>
			{type === 'read' ? (
				<p className="text-sm ml-11">{editText}</p>
			) : (
				<div className="border-[1px] rounded-md border-gray ml-11 mr-7 mt-1 p-2">
					<textarea
						placeholder={editText}
						value={editText}
						onChange={handleChangeCommit}
						className="w-full text-sm resize-none focus:outline-none"
					/>
					<div className="flex justify-end gap-3 text-point1">
						<button onClick={handleCancelEdit}>취소</button>
						<button onClick={handleCompleteEdit}>완료</button>
					</div>
				</div>
			)}
			<LikeButton commentId={commentInfo.id} likeStatus={commentInfo.numberOfLikes > 0} />
			<ShowMoreButton commentId={commentInfo.id} />
		</div>
	)
}

export default CommentItem
