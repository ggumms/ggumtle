import CommentItem from './CommentItem'
import { useEffect, useState } from 'react'
import { useCommentStore, useDetailPageTypeStore } from '../../../../store/detailStore'
import { Skeleton } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import useInfiniteCommentList from '../../../../hooks/useInfiniteCommentList'

interface ICommentListProps {
	isInputFocused: boolean
	setIsInputShown: React.Dispatch<React.SetStateAction<boolean>>
	id: string
}

// Todo : Api 데이터 타입 지정 후 as 삭제 예정
const CommentList = ({ isInputFocused, setIsInputShown, id }: ICommentListProps) => {
	const { commentText } = useCommentStore()
	const { pageType } = useDetailPageTypeStore()
	const [selectedId, setSelectedId] = useState<null | number>(null)
	const { ref: lastElementRef, inView: lastElementInView } = useInView()
	const { ref: listRef, inView: listInView } = useInView()

	const { commentListData, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteCommentList(id)

	useEffect(() => {
		if (lastElementInView && hasNextPage) {
			fetchNextPage()
		}
	}, [lastElementInView, hasNextPage])

	useEffect(() => {
		// 타겟이 보일 때 -> 항상 input이 보이도록 설정
		if (listInView === true) {
			setIsInputShown(true)
			return
		}
		if (listInView === false && commentText.length === 0 && !isInputFocused) {
			setIsInputShown(false)
			return
		}
	}, [listInView, commentText, isInputFocused])

	if (isError) {
		return <></>
	}
	return (
		<>
			{isLoading ? (
				<>{/* Skeleton UI 작성 */}</>
			) : (
				<ul ref={listRef}>
					{commentListData.map((comment, index) => (
						<li key={`comment-${index}`}>
							<CommentItem
								commentInfo={comment}
								type={comment.id === selectedId && pageType === 'editComment' ? 'edit' : 'read'}
								setSelectedId={setSelectedId}
							/>
						</li>
					))}
				</ul>
			)}
			{isFetchingNextPage ? <Skeleton /> : <div ref={lastElementRef}></div>}
		</>
	)
}

export default CommentList
