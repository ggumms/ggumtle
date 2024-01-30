import InterestTag from '../../../components/InterestTag'
import ProfileBucket from '../../../components/ProfileBucket'
import { UserInfoType } from '../../../interfaces'
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
	const category: string[] = ['연애', '언어', '환경']
	return (
		<div className='bg-white px-5'>
			<div className="flex items-center justify-around py-3">
				<div className="flex flex-col items-center justify-center w-2/5">
					{/* @TODO: 추후 실제 프로필 이미지로 변경 */}
					<svg
						viewBox="0 0 36 36"
						fill="none"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						width="60"
						height="60"
					>
						<mask id=":r14:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
							<rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
						</mask>
						<g mask="url(#:r14:)">
							<rect width="36" height="36" fill="#ff8482"></rect>
							<rect
								x="0"
								y="0"
								width="36"
								height="36"
								transform="translate(-3 -3) rotate(87 18 18) scale(1)"
								fill="#f8d8a5"
								rx="36"
							></rect>
							<g transform="translate(-7 -4) rotate(7 18 18)">
								<path
									d="M15 19c2 1 4 1 6 0"
									stroke="#000000"
									fill="none"
									stroke-linecap="round"
								></path>
								<rect
									x="12"
									y="14"
									width="1.5"
									height="2"
									rx="1"
									stroke="none"
									fill="#000000"
								></rect>
								<rect
									x="22"
									y="14"
									width="1.5"
									height="2"
									rx="1"
									stroke="none"
									fill="#000000"
								></rect>
							</g>
						</g>
					</svg>
					<p className="font-semibold text-point1">juno</p>
				</div>
				<div className="w-full">
					<ProfileBucket title={bucketTitle} color={color} dayCount={dayCount} isLock={null} />
					<div className="bg-white px-3">
						{category.map((cate, index) => (
							<InterestTag tag={cate} key={index}/>
						))}
					</div>
				</div>
			</div>
			<div>
				<NumInfo />
			</div>
		</div>
	)
}

export default ProfileSection
