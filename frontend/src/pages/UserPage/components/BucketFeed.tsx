import InterestTag from '../../../components/InterestTag'
import ProfileBucket from '../../../components/ProfileBucket'
import { CheerUpReaction, CoolReaction, MetooReaction } from '../../../constants/reactions'
import { UserInfoType } from '../../../interfaces'
import LocationInfo from './LocationInfo'

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
	return (
		<div className="bg-white px-4 py-2">
			<ProfileBucket title={bucketTitle} color={color} dayCount={dayCount} isLock={null} />
			<div className="bg-white">
				{category.map((cate, index) => (
					<InterestTag tag={cate} key={index} />
				))}
			</div>
			{photo && (
				<img
					src="/public/dummy.PNG
      "
					alt="dummy"
					className="w-full h-48 object-cover my-2 rounded-md"
				/>
			)}
			{location && <LocationInfo />}
			<div className="flex">
				<CoolReaction />
				<MetooReaction />
				<CheerUpReaction />
			</div>
		</div>
	)
}

export default BucketFeed
