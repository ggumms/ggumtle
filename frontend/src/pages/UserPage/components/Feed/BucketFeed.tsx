import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { UserInfoType } from '../../../../interfaces'
import { FiShare } from 'react-icons/fi'
import LocationInfo from './LocationInfo'
import TotalReaction from './TotalReaction'
import TotalComment from './TotalComment'
import UserProfile from '../../../../components/UserProfile'

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
		color: 'mint',
		isAchieved: true,
		owner: true,
		isFollowing: null,
	}
	const { bucketTitle, color, dayCount } = userInfo
	const category: string[] = ['직장', '여행', '인간관계']
	const photo = true
	const location = true
	const reactionCnt = 28
	const commentCnt = 12
	return (
		<div className="bg-white px-4 py-2">
			{/* 작성자 프로필 정보 */}
			<div className="pt-1 pb-2">
				<UserProfile type="detail" userInfo={userInfo} />
			</div>

			{/* 버킷 */}
			<ProfileBucket title={bucketTitle} color={color} dayCount={dayCount} isLock={null} />

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
					className="w-full h-48 object-cover my-2 rounded-md"
				/>
			)}

			{/* 피드 제일 하단 감정 개수, 댓글 개수, 공유 버튼 */}
			<div className="flex justify-between items-center pb-1">
				<div className="flex gap-2">
					<TotalReaction count={reactionCnt} />
					<TotalComment count={commentCnt} />
				</div>
				<FiShare size="0.9rem" color="#454645" />
			</div>
		</div>
	)
}

export default BucketFeed
