import CommentItem from './CommentItem'
import { useEffect, useState } from 'react'
import { useCommentStore, useDetailPageTypeStore } from '../../../../../store/detailStore'
import { Skeleton } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import useInfiniteCommentList from '../../../../../hooks/useInfiniteCommentList'

interface ICommentListProps {
	isInputFocused: boolean
	setIsInputShown: React.Dispatch<React.SetStateAction<boolean>>
	id: string
}

const CommentList = ({ isInputFocused, setIsInputShown, id }: ICommentListProps) => {
	const { commentText } = useCommentStore()
	const { pageType } = useDetailPageTypeStore()
	const [selectedId, setSelectedId] = useState<null | number>(null)
	const { ref: lastElementRef, inView: lastElementInView } = useInView()
	const { ref: listRef, inView: listInView } = useInView()

	const { commentListData, isLoading, isError, fetchNextPage, isFetchingNextPage } =
		useInfiniteCommentList(id)

	useEffect(() => {
		if (lastElementInView) {
			fetchNextPage()
		}
	}, [lastElementInView, commentListData, fetchNextPage])

	useEffect(() => {
		if (pageType !== 'read') {
			setIsInputShown(false)
			return
		}
		// 타겟이 보일 때 -> 항상 input이 보이도록 설정
		if (listInView === true) {
			setIsInputShown(true)
			return
		}
		if (listInView === false && commentText.length === 0 && !isInputFocused) {
			setIsInputShown(false)
			return
		}
	}, [listInView, commentText, isInputFocused, pageType])

	if (isError) {
		return <></>
	}
	return (
		<>
			{isLoading ? (
				<>{/* Skeleton UI 작성 */}</>
			) : (
				<ul ref={listRef} className="flex flex-col gap-4 px-1 pb-28">
					{commentListData.map((comment, index) => (
						<li
							key={`comment-${index}`}
							ref={index === commentListData.length - 1 ? lastElementRef : null}
						>
							<CommentItem
								commentInfo={comment}
								type={comment.id === selectedId && pageType === 'editComment' ? 'edit' : 'read'}
								selectedId={selectedId}
								setSelectedId={setSelectedId}
							/>
						</li>
					))}
				</ul>
			)}
			{isFetchingNextPage && <Skeleton />}
		</>
	)
}

export default CommentList
