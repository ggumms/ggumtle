import InterestTag from '../../../components/InterestTag'
import ProfileBucket from '../../../components/ProfileBucket'
import { IBucketSearch } from '../../../store/searchBucketStore'
import TotalComment from '../../UserPage/components/FeedSection/TotalComment'
import TotalReaction from '../../UserPage/components/FeedSection/TotalReaction'
import FeedShare from '../../UserPage/utils/FeedShare'

const SearchBucketItem = ({bucket}: {bucket: IBucketSearch}) => {
	return (
		<div className="bg-white px-5 py-2 flex flex-col gap-1">
			<ProfileBucket /* 버킷 정보 */
				type="profile"
				isLoading={false}
				title={bucket.title}
				color={bucket.color}
				dayCount={bucket.dayCount}
				isLock={false} // 검색 버킷에 비공개 버킷은 뜨지 않음
				isDone={false}
			/>
			<fieldset /* 카테고리 */>
				{bucket.category.map((cate) => (
					<InterestTag tag={cate} />
				))}
			</fieldset>
			<fieldset /* 리액션, 댓글, 공유 */ className="flex justify-between items-center pb-1">
				<div className="flex gap-2">
					<TotalReaction count={bucket.reactionCount} />
					<TotalComment count={bucket.commentCount} />
				</div>
				<FeedShare />
			</fieldset>
		</div>
	)
}

export default SearchBucketItem
