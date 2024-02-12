import { IoCheckbox } from 'react-icons/io5'
import { textColorClass } from '../../../constants/dynamicClass'
import FeedShare from '../../UserPage/utils/FeedShare'
import TotalReaction from '../../UserPage/components/FeedSection/TotalReaction'
import TotalComment from '../../UserPage/components/FeedSection/TotalComment'
import { IReviewSearch } from '../../../store/searchReviewStore'
import { Link } from 'react-router-dom'

const SearchReviewItem = ({ review }: { review: IReviewSearch }) => {
	const { bucketColor, bucketTitle, reviewTitle, reviewReactionCount, reviewCommentCount } = review

	return (
		<Link to={`/review/${review.reviewId}`} className="flex flex-col gap-1 px-5 py-4 bg-white">
			<fieldset className="flex gap-1">
				<p className={`${textColorClass[bucketColor]} text-xs font-light`}>{bucketTitle}</p>
				<IoCheckbox size="1rem" className={`rounded-xl ${textColorClass[bucketColor]}`} />
			</fieldset>
			<p className="text-point1 text-md font-semibold">{reviewTitle}</p>
			{/* <p className="line-clamp-2 text-xs text-point1 leading-2 font-light">{content}</p> */}

			<fieldset className="flex justify-between items-center py-1">
				<div className="flex gap-2">
					<TotalReaction count={reviewReactionCount} />
					<TotalComment count={reviewCommentCount} />
				</div>
				<FeedShare />
			</fieldset>
		</Link>
	)
}

export default SearchReviewItem
