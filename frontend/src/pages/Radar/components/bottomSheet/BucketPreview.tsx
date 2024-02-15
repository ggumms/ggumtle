import { useQuery } from '@tanstack/react-query'
import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { CategoryType, ColorType } from '../../../../interfaces'
import { getBucketPreview } from '../../api'
import { Skeleton } from '@mui/material'

interface IBucketInfo {
	writerId: number
	reviewId: number
	title: string
	timeCapsule: string
	bucketPicture: string
	color: ColorType
	reminderDate: string
	latitude: number
	longitude: number
	address: string
	dayCount: number
	achievementDate: string
	category: CategoryType[]
	isPrivate: boolean
	createdDate: string
}
const BucketPreview = ({ bucketId }: { bucketId: number }) => {
	const { isLoading, data: bucketInfo } = useQuery<IBucketInfo>({
		queryKey: ['previewBucket', bucketId],
		queryFn: getBucketPreview,
		enabled: !!bucketId,
	})
	const category: CategoryType[] = ['연애', '언어', '환경']

	return (
		<div className="w-full flex items-center justify-around min-h-28">
			<div className="flex flex-col items-center justify-center w-2/5">
				{isLoading ? (
					<Skeleton variant="rectangular" width={65} height={65} />
				) : (
					bucketInfo && (
						<div className="w-16 h-16 rounded-2xl overflow-hidden">
							<img
								src={bucketInfo.bucketPicture}
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
					)
				)}
			</div>
			<div className="w-full px-2">
				{/* @TODO: 비공개 버킷일 경우 처리 */}
				{isLoading ? (
					<div>
						<Skeleton variant="text" height={40} width={'90%'} />
						<Skeleton variant="text" height={20} width={'80%'} />
					</div>
				) : (
					bucketInfo && (
						<ProfileBucket
							type="profile"
							isLoading={isLoading}
							title={bucketInfo.title}
							color={bucketInfo.color}
							dayCount={bucketInfo.dayCount}
							isLock={null}
							isDone={false}
						/>
					)
				)}
				<div className="bg-white">
					{isLoading ? (
						<Skeleton variant="text" height={20} width={'50%'} />
					) : (
						// bucketInfo?.category.map((cate, index) => (
						category.map((cate, index) => <InterestTag tag={cate} key={index} />)
					)}
				</div>
			</div>
		</div>
	)
}

export default BucketPreview
