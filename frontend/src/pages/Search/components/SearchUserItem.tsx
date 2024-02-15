import { useState } from 'react'
import UserProfile from '../../../components/UserProfile/UserProfile'
import { UserInfoType } from '../../../interfaces'
import { updateFollow } from '../../UserPage/api'
import { useMutation } from '@tanstack/react-query'

const SearchUserItem = ({ user }: { user: UserInfoType }) => {
	const mutation = useMutation({ mutationFn: updateFollow })
	const [isFollow, setIsFollow] = useState(user.isFollowing)

	const handleFollowButton = () => {
		mutation.mutate({ userId: user.userId, isFollowing: !isFollow })
		setIsFollow(!isFollow)
	}

	return (
		<div className="flex items-center gap-3 justify-between px-1 py-1">
			<UserProfile type="follow" userInfo={user} isLoading={false} />
			<button
				onClick={handleFollowButton}
				className={`${isFollow ? 'bg-lightGray text-subText' : 'bg-point1 text-white'}  inline-flex h-[22px] flex-shrink-0 items-center justify-center text-xs rounded-md px-4`}
			>
				{isFollow ? '팔로잉' : '팔로우'}
			</button>
		</div>
	)
}

export default SearchUserItem
