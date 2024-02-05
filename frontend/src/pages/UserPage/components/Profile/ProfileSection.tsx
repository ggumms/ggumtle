import { DummyUser1 } from '../../../../assets/svgs'
import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { CategoryType, UserInfoType } from '../../../../interfaces'
import FollowButtons from './FollowButtons'
import NumInfo from './NumInfo'

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
	const category: CategoryType[] = ['연애', '언어', '환경']
	return (
		<div className="bg-white px-5 py-4">
			<div className="flex items-center justify-around">
				<div className="flex flex-col items-center justify-center w-2/5">
					{/* @TODO: 추후 실제 프로필 이미지로 변경 */}
					<DummyUser1 />
					<p className="font-semibold text-point1">juno</p>
				</div>
				<div className="w-full px-2">
					{/* @TODO: 대표버킷 없을 경우 처리 */}
					<ProfileBucket title={bucketTitle} color={color} dayCount={dayCount} isLock={null} />
					<div className="bg-white">
						{category.map((cate, index) => (
							<InterestTag tag={cate} key={index} />
						))}
					</div>
				</div>
			</div>
			<div>
				<NumInfo />
				<FollowButtons />
			</div>
		</div>
	)
}

export default ProfileSection
