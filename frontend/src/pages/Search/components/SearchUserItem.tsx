import UserProfile from '../../../components/UserProfile'
import { UserInfoType } from '../../../interfaces'
import { IUserSearch } from '../../../store/searchUserStore'

const SearchUserItem = ({ user }: { user: IUserSearch }) => {
	const userInfo: UserInfoType = {
		userId: user.userId,
		userProfileImage: user.userProfileImage,
		userNickname: user.userNickname,
		category: [],
		bucketId: user.bucketId,
		bucketTitle: user.bucketTitle,
		dayCount: undefined,
		color: user.bucketColor,
		isAchieved: user.isAchieved,
		owner: undefined,
		isFollowing: user.isFollowing,
	}
	console.log('잘 넘어왔나?', userInfo)
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
