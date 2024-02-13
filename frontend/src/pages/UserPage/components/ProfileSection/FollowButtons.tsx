import { useMutation } from '@tanstack/react-query'
import { updateFollow } from '../../api'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'
import { useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'

const FollowButtons = ({ userId }: { userId: number }) => {
	const mutation = useMutation({ mutationFn: updateFollow })
	const { userInfo } = useUserInfoQuery(userId)
	const [isFollow, setIsFollow] = useState(userInfo?.isFollowing)
	console.log(userInfo, isFollow)

	const handleFollowButton = () => {
		mutation.mutate({ userId: userId, isFollowing: !isFollow })
		setIsFollow(!isFollow)
	}
	const handleShareButton = () => {
		console.log('click profile share')
	}

	// useEffect(() => {
	// 	const isFollowing = isFollow
	// 	console.log('mutation: ', mutation)
	// 	if (isFollowing) mutation.mutate({ userId, isFollowing })
	// 	else console.log('undefined')
	// }, [isFollow])
	return (
		<div className="flex gap-2 px-4">
			{/* @TODO: 마이페이지일 경우 프로필 편집 버튼이 됨 */}
			{isFollow ? (
				<div
					onClick={handleFollowButton}
					className="bg-lightGray text-point1 w-1/2 flex items-center justify-center text-sm h-6 rounded-md"
				>
					<span className='pl-3'>
						팔로잉 중
						</span>
					<IoIosCheckmark className="text-green text-2xl m-0" />
				</div>
			) : (
				<div
					onClick={handleFollowButton}
					className="bg-point1 text-white w-1/2 flex items-center justify-center text-sm h-6 rounded-md"
				>
					팔로우
				</div>
			)}
			<div
				onClick={handleShareButton}
				className="bg-lightGray text-point1 w-1/2 flex items-center justify-center text-sm h-6 rounded-md"
			>
				프로필 공유
			</div>
		</div>
	)
}

export default FollowButtons
