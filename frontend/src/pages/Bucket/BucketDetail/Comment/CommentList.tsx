import Comment from './Comment'
import { ICommentItem } from '../../../../interfaces'

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
				userProfileImage: null,
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
				userProfileImage: null,
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
				userProfileImage: null,
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

// Todo : Api 데이터 타입 지정 후 as 삭제 예정
const CommentList = () => {
	return (
		<ul>
			{commentInfo.content.map((comment) => (
				<Comment commentInfo={comment as ICommentItem} />
			))}
		</ul>
	)
}

export default CommentList
