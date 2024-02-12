import { IoCheckbox } from 'react-icons/io5'
import { textColorClass } from '../../../constants/dynamicClass'
import TotalReaction from '../../UserPage/components/Feed/TotalReaction'
import TotalComment from '../../UserPage/components/Feed/TotalComment'
import FeedShare from '../../UserPage/utils/FeedShare'

const SearchReviewItem = () => {
	const bucketTitle = '유튜브 구독자 100만 달성하기'
	const reviewTitle = '꿈에 그리던 구독자 100만명 달성,,,'
	const color = 'mint'
	const content =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolorum cumque ducimus esse, ipsam est, debitis atque eveniet unde sit earum alias, aliquid nam. Rerum eligendi ipsam iure quae quas? Est esse sit quasi illum pariatur ad tempora ullam enim, delectus soluta aperiam cum voluptates, ratione impedit, vitae totam consequatur!'
	const reactionCnt = 40
	const commentCnt = 23
	return (
		<div className="flex flex-col gap-1 px-5 py-4 bg-white">
			<fieldset className="flex gap-1">
				<p className={`${textColorClass[color]} text-xs font-light`}>{bucketTitle}</p>
				<IoCheckbox size="1rem" className={`rounded-xl ${textColorClass[color]}`} />
			</fieldset>
			<p className="text-point1 text-sm font-semibold">{reviewTitle}</p>
			<p className="line-clamp-2 text-xs text-point1 leading-2 font-light">{content}</p>
			<fieldset /* 리액션, 댓글, 공유 */ className="flex justify-between items-center py-1">
				<div className="flex gap-2">
					<TotalReaction count={reactionCnt} />
					<TotalComment count={commentCnt} />
				</div>
				<FeedShare />
			</fieldset>
		</div>
	)
}

export default SearchReviewItem
