import Comment from './Comment'
import { ICommentItem } from '../../../../interfaces'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCommentStore, useDetailPageTypeStore } from '../../../../store/detailStore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getBucketCommentList } from '../api'
import { Skeleton } from '@mui/material'
import { useInView } from 'react-intersection-observer'

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
	const { ref, inView } = useInView()

	const targetRef = useRef<HTMLUListElement>(null)

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryKey: ['comments', id],
		queryFn: getBucketCommentList,
		initialPageParam: 0,
		getNextPageParam: (lastPageInfo) => (lastPageInfo.last ? null : lastPageInfo.number + 1),
	})

	const commentListData = useMemo(() => {
		let result: ICommentItem[] = []
		if (data) {
			data.pages.forEach((pageInfo) => {
				result = [...result, ...pageInfo.content]
			})
		}
		return result
	}, [data])

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage])

	// 전역 이벤트 핸들러에서 closure 때문에 최신 state 값을 못 가져오는 문제 해결을 위한 useEffect
	useEffect(() => {
		window.addEventListener('scroll', checkTargetIsShown)

		// 초기 로드 시에도 위치 확인
		checkTargetIsShown()

		return () => {
			window.removeEventListener('scroll', checkTargetIsShown)
		}
	}, [commentText, isInputFocused])

	// Todo : 매개변수로 commentText, isInputFocused 받아서 처리하도록 refactoring -> 테스트하면서 closure 문제 맞는지 확인 한번 더 해보기
	// Todo : pageType이 읽기 모드(read)일 때만 input창 뜨도록 수정하기
	const checkTargetIsShown = () => {
		if (targetRef.current) {
			const targetLocationInfo = targetRef.current.getBoundingClientRect()
			const isVisible = targetLocationInfo.top < window.innerHeight

			// 타겟이 보일 때 -> 항상 input이 보이도록 설정
			if (isVisible === true) {
				setIsInputShown(true)
				return
			}
			if (isVisible === false && commentText.length === 0 && !isInputFocused) {
				setIsInputShown(false)
				return
			}
		}
	}

	return (
		<>
			{status === 'pending' ? (
				<>{/* Skeleton UI 작성 */}</>
			) : (
				<ul ref={targetRef}>
					{commentListData.map((comment, index) => (
						<li key={`comment-${index}`}>
							<Comment
								commentInfo={comment as ICommentItem}
								type={comment.id === selectedId && pageType === 'editComment' ? 'edit' : 'read'}
								setSelectedId={setSelectedId}
							/>
						</li>
					))}
				</ul>
			)}
			{isFetchingNextPage ? <Skeleton /> : <div ref={ref}></div>}
		</>
	)
}

export default CommentList
