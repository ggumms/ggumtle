import { useEffect, useState } from 'react'
import UserProfile from '../../../components/UserProfile'
import { UserInfoType } from '../../../interfaces'
import { IUserSearch } from '../../../store/searchUserStore'
import { updateFollow } from '../../UserPage/api'
import { useMutation } from '@tanstack/react-query'

const SearchUserItem = ({ user }: { user: IUserSearch }) => {
	const mutation = useMutation({ mutationFn: updateFollow })
	const [isFollow, setIsFollow] = useState(user.isFollowing)
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

	const handleFollowButton = () => {
		setIsFollow(!isFollow)
	}
	
	useEffect(() => {
		console.log('누른 후 상태변화 useEffect', isFollow)
		mutation.mutate({ userId: user.userId, isFollowing: !isFollow })
	}, [isFollow])

	return (
		<div className="flex justify-between items-center px-1 py-1">
			<UserProfile type="follow" userInfo={userInfo} />
			<button
				onClick={handleFollowButton}
				className={`${isFollow ? 'bg-lightGray text-subText' : 'bg-point1 text-white'}  inline-flex h-[22px] items-center justify-center text-xs rounded-md px-4`}
			>
				{isFollow ? '팔로잉' : '팔로우'}
			</button>
		</div>
	)
}

export default SearchUserItem
