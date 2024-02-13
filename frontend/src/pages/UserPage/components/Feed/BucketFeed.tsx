import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { CategoryType, UserInfoType } from '../../../../interfaces'
import UserProfile from '../../../../components/UserProfile/UserProfile'
import FeedShare from '../../utils/FeedShare'
import LocationInfo from '../FeedSection/LocationInfo'
import TotalReaction from '../FeedSection/TotalReaction'
import TotalComment from '../FeedSection/TotalComment'

// 하나의 피드 (버킷)
const BucketFeed = () => {
	const userInfo: UserInfoType = {
		userId: 1,
		userProfileImage: 'url',
		userNickname: 'junho',
		category: ['인간관계', '여행', '직장'],
		bucketId: 2,
		bucketTitle: '구독자 100만명 달성하기',
		dayCount: 14,
		bucketColor: 'mint',
		isAchieved: true,
		owner: true,
		isFollowing: null,
	}
	const { bucketTitle, bucketColor, dayCount } = userInfo
	const category: CategoryType[] = ['직장', '여행', '인간관계']
	const photo = true
	const location = true
	const reactionCnt = 28
	const commentCnt = 12
	const hasTitleBucket = bucketTitle && bucketColor && dayCount

	return (
		<div className="px-4 py-2 bg-white">
			{/* 작성자 프로필 정보 */}
			<div className="pt-1 pb-2">
				<UserProfile type="detail" userInfo={userInfo} isLoading={false} />
			</div>

			{/* 버킷 */}
			{hasTitleBucket && (
				<ProfileBucket
					type="profile"
					isLoading={false}
					title={bucketTitle}
					color={bucketColor}
					dayCount={dayCount}
					isLock={null}
					isDone={false}
				/>
			)}

			{/* 태그 */}
			<div className="bg-white">
				{category.map((cate, index) => (
					<InterestTag tag={cate} key={index} />
				))}
			</div>

			{/* 옵셔널한 정보들 (장소, 사진) */}
			{location && <LocationInfo />}
			{photo && (
				<img
					src="/public/dummy.PNG
      "
					alt="dummy"
					className="object-cover w-full h-48 my-2 rounded-md"
				/>
			)}

			{/* 피드 제일 하단 감정 개수, 댓글 개수, 공유 버튼 */}
			<div className="flex items-center justify-between pb-1">
				<div className="flex gap-2">
					<TotalReaction count={reactionCnt} />
					<TotalComment count={commentCnt} />
				</div>
				<FeedShare />
			</div>
		</div>
	)
}

export default BucketFeed
