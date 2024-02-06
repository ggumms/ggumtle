import { useQuery } from '@tanstack/react-query'
import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { CategoryType, ColorType } from '../../../../interfaces'
import { getUserPreview } from '../../api'
import { Skeleton } from '@mui/material'
interface IUserInfo {
	userId: number
	userProfileImage: string
	userNickname: string
	category: CategoryType[]
	bucketId: number
	bucketTitle: string
	dayCount: number
	color: ColorType
	isAchieved: boolean
	owner: boolean
	isFollowing: boolean
}
const UserPreview = ({ userId }: { userId: number }) => {
	const { isLoading, data: userInfo } = useQuery<IUserInfo>({
		queryKey: ['previewUser', userId],
		queryFn: getUserPreview,
		enabled: !!userId,
	})
	const category: CategoryType[] = ['연애', '언어', '환경']

	return (
		<div className="w-full flex items-center justify-around">
			<div className="flex flex-col items-center justify-center w-2/5">
				{isLoading ? (
					<Skeleton variant="circular" width={60} height={60} />
				) : (
					<div className="w-16 h-16 rounded-full overflow-hidden">
						<img src={userInfo?.userProfileImage} alt="" className="w-full h-full object-cover" />
					</div>
				)}
				<p className="font-semibold text-point1">{userInfo?.userNickname}</p>
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
							isLoading={isLoading}
							title={userInfo.bucketTitle}
							color={userInfo.color}
							dayCount={userInfo.dayCount}
							isLock={null}
						/>
					)
				)}
				<div className="bg-white">
					{isLoading ? (
						<Skeleton variant="text" height={20} width={'50%'} />
					) : (
						// userInfo?.category.map((cate, index) => (
						category.map((cate, index) => <InterestTag tag={cate} key={index} />)
					)}
				</div>
			</div>
		</div>
	)
}

export default UserPreview
