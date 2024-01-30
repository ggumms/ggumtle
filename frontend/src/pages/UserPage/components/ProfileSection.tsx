import InterestTag from '../../../components/InterestTag'
import ProfileBucket from '../../../components/ProfileBucket'
import { UserInfoType } from '../../../interfaces'

const ProfileSection = () => {
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
	const category: string[] = ['연애', '언어', '환경']
	return (
		<div>
			<div>프로필 부분</div>
			<div>
				<ProfileBucket title={bucketTitle} color={color} dayCount={dayCount} isLock={null} />
				<div>
					{category.map((cate) => (
						<InterestTag tag={cate} />
					))}
					(
				</div>
			</div>
		</div>
	)
}

export default ProfileSection
