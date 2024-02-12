import InterestTag from '../../../components/InterestTag'
import ProfileBucket from '../../../components/ProfileBucket'
import { UserInfoType } from '../../../interfaces'
import TotalComment from '../../UserPage/components/Feed/TotalComment'
import TotalReaction from '../../UserPage/components/Feed/TotalReaction'
import FeedShare from '../../UserPage/utils/FeedShare'
const SearchBucketItem = () => {
	const userInfo: UserInfoType = {
		userId: 1,
		userProfileImage: 'url',
		userNickname: 'junho',
		category: ['인간관계', '여행', '직장'],
		bucketId: 2,
		bucketTitle: '구독자 100만명 달성하기',
		dayCount: 14,
		color: 'mint',
		isAchieved: true,
		owner: true,
		isFollowing: null,
	}

	const reactionCnt = 40
	const commentCnt = 23
	return (
		<div className="bg-white px-4 py-2 flex flex-col gap-1">
			<ProfileBucket /* 버킷 정보 */
				type="profile"
				isLoading={false}
				title={userInfo.bucketTitle}
				color={userInfo.color!}
				dayCount={userInfo.dayCount!}
				isLock={false} // 검색 버킷에 비공개 버킷은 뜨지 않음
				isDone={false}
			/>
			<fieldset /* 카테고리 */ >
				{userInfo.category.map((cate) => (
					<InterestTag tag={cate} />
				))}
			</fieldset>
			<fieldset /* 리액션, 댓글, 공유 */ className="flex justify-between items-center pb-1" >
				<div className="flex gap-2">
					<TotalReaction count={reactionCnt} />
					<TotalComment count={commentCnt} />
				</div>
				<FeedShare />
			</fieldset>
		</div>
	)
}

export default SearchBucketItem
