import UserProfile from '../../../components/UserProfile'
import { UserInfoType } from '../../../interfaces'

const SearchUserItem = () => {
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
		// isFollowing: false,
		isFollowing: true,
	}
	return (
		<div className="flex justify-between items-center px-1 py-1">
			<UserProfile type="follow" userInfo={userInfo} />
			<button
				className={`${userInfo.isFollowing ? 'bg-lightGray text-subText' : 'bg-point1 text-white'}  inline-flex h-[22px] items-center justify-center text-xs rounded-md px-4`}
			>
				{userInfo.isFollowing ? '팔로잉' : '팔로우'}
			</button>
		</div>
	)
}

export default SearchUserItem
