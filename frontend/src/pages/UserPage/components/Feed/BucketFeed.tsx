import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { CategoryType } from '../../../../interfaces'
import TotalReaction from '../FeedSection/TotalReaction'
import TotalComment from '../FeedSection/TotalComment'
import UserProfile from '../../../../components/UserProfile/UserProfile'
import FeedShare from '../../utils/FeedShare'
import { IFeed } from '../FeedSection'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'
import { Link } from 'react-router-dom'

// 하나의 피드 (버킷)
const BucketFeed = ({ userId, bucket }: { userId: number; bucket: IFeed }) => {
	const { userInfo } = useUserInfoQuery(userId)

	return (
		<Link to={`/bucket/${bucket.id}`} className="">
			{/* 작성자 프로필 정보 */}
			<div className="pt-1 pb-2">
				{userInfo && <UserProfile type="detail" userInfo={userInfo} isLoading={false} />}
			</div>

			{/* 버킷 */}
			{
				<ProfileBucket
					type="profile"
					isLoading={false}
					title={bucket.title}
					color={bucket.color}
					dayCount={bucket.day}
					isLock={null}
					isDone={bucket.isAchieved}
				/>
			}

			{/* 태그 */}
			<div className="bg-white">
				{bucket.categories.map((cate: CategoryType, index: number) => (
					<InterestTag tag={cate} key={index} />
				))}
			</div>

			{/* 옵셔널한 정보들 (장소, 사진) 타임라인 조회 api에 address는 없길래 일단 뺐습니다
			{location && <LocationInfo />} */}
			{bucket.images.length &&
				bucket.images.map((image) => (
					<img src={image} className="object-cover w-full h-48 my-2 rounded-md" />
				))}

			{/* 피드 제일 하단 감정 개수, 댓글 개수, 공유 버튼 */}
			<div className="flex items-center justify-between pb-1">
				<div className="flex gap-2">
					<TotalReaction count={bucket.reactionCount} />
					<TotalComment count={bucket.commentCount} />
				</div>
				<FeedShare />
			</div>
		</Link>
	)
}

export default BucketFeed
