import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { Skeleton } from '@mui/material'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'
import { randomProfile } from '../../../../constants/randomProfile'

const UserPreview = ({ userId }: { userId: number }) => {
	const { isLoading, userInfo } = useUserInfoQuery(userId)
	return (
		<div className="flex items-center justify-around w-full">
			<div className="flex flex-col items-center justify-center w-2/5">
				{isLoading ? (
					<Skeleton variant="circular" width={60} height={60} />
				) : (
					userInfo &&
					(userInfo.userProfileImage ? (
						<div className="w-16 h-16 overflow-hidden rounded-full">
							<img src={userInfo.userProfileImage} alt="유저 프로필" />
						</div>
					) : (
						randomProfile[userInfo.userId % 6]
					))
				)}
				{!isLoading && userInfo && (
					<p className="font-semibold text-point1">{userInfo.userNickname}</p>
				)}
			</div>
			<div className="w-full px-2">
				{/* @TODO: 대표버킷 없을 경우 처리 */}
				{isLoading ? (
					<div>
						<Skeleton variant="text" height={40} width={'90%'} />
						<Skeleton variant="text" height={20} width={'80%'} />
					</div>
				) : (
					userInfo && (
						<ProfileBucket
							type="profile"
							isLoading={isLoading}
							title={userInfo.bucketTitle}
							color={userInfo.bucketColor}
							dayCount={userInfo.dayCount}
							isLock={null}
							isDone={userInfo.isAchieved}
						/>
					)
				)}
				<div className="bg-white">
					{isLoading ? (
						<Skeleton variant="text" height={20} width={'50%'} />
					) : (
						userInfo &&
						userInfo.category.map((cate, index) => <InterestTag tag={cate} key={index} />)
					)}
				</div>
			</div>
		</div>
	)
}

export default UserPreview
