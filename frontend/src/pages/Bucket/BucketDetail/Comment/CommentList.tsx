import Comment from './Comment'
import { ICommentItem } from '../../../../interfaces'
import { useEffect, useRef } from 'react'
import { useCommentStore } from '../../../../store/detailStore'

const commentInfo = {
	totalPages: 0,
	totalElements: 0,
	size: 0,
	content: [
		{
			id: 1,
			context: '10만이 엊그제 같은데... 벌써 20만이라니...',
			writer: {
				userId: 1,
				userProfileImage: 'url',
				userNickname: '서준호',
				bucketId: 2,
				bucketTitle: '구독자 100만명 달성하기',
				color: 'mint',
				isAchieved: false,
				isFollowing: false,
			},
			numberOfLikes: 1,
			timeUnit: 'min',
			time: 3,
			createdDate: '2023-12-29 10:34',
			updatedDate: '2023-12-29 10:34',
		},
		{
			id: 1,
			context: '10만이 엊그제 같은데... 벌써 20만이라니...',
			writer: {
				userId: 1,
				userProfileImage: 'url',
				userNickname: '서준호',
				bucketId: 2,
				bucketTitle: '구독자 100만명 달성하기',
				color: 'mint',
				isAchieved: false,
				isFollowing: false,
			},
			numberOfLikes: 1,
			timeUnit: 'min',
			time: 3,
			createdDate: '2023-12-29 10:34',
			updatedDate: '2023-12-29 10:34',
		},
		{
			id: 1,
			context: '10만이 엊그제 같은데... 벌써 20만이라니...',
			writer: {
				userId: 1,
				userProfileImage: 'url',
				userNickname: '서준호',
				bucketId: 2,
				bucketTitle: '구독자 100만명 달성하기',
				color: 'mint',
				isAchieved: false,
				isFollowing: false,
			},
			numberOfLikes: 1,
			timeUnit: 'min',
			time: 3,
			createdDate: '2023-12-29 10:34',
			updatedDate: '2023-12-29 10:34',
		},
	],
	number: 0,
	sort: {
		empty: true,
		unsorted: true,
		sorted: true,
	},
	pageable: {
		offset: 0,
		sort: {
			empty: true,
			unsorted: true,
			sorted: true,
		},
		paged: true,
		unpaged: true,
		pageNumber: 0,
		pageSize: 0,
	},
	numberOfElements: 0,
	first: true,
	last: true,
	empty: true,
}
interface ICommentListProps {
	isInputFocused: boolean
	setIsInputShown: React.Dispatch<React.SetStateAction<boolean>>
}

// Todo : Api 데이터 타입 지정 후 as 삭제 예정
const CommentList = ({ isInputFocused, setIsInputShown }: ICommentListProps) => {
	const { commentText } = useCommentStore()
	const targetRef = useRef<HTMLUListElement>(null)

	// 전역 이벤트 핸들러에서 closure 때문에 최신 state 값을 못 가져오는 문제 해결을 위한 useEffect
	useEffect(() => {
		window.addEventListener('scroll', checkTargetIsShown)
		checkTargetIsShown() // 초기 로드 시에도 위치 확인

		return () => {
			window.removeEventListener('scroll', checkTargetIsShown)
		}
	}, [commentText, isInputFocused])

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
		<ul ref={targetRef}>
			{commentInfo.content.map((comment, index) => (
				<li key={index}>
					<Comment commentInfo={comment as ICommentItem} />
				</li>
			))}
		</ul>
	)
}

export default CommentList
