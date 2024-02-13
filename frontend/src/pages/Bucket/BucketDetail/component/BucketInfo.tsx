import ProfileBucket from '../../../../components/ProfileBucket'
import { ColorType } from '../../../../interfaces'
import BucketInfoSkeleton from './Skeleton/BucketInfoSkeleton'

interface BucketInfoProps {
	isLoading: boolean
	title: string | null | undefined
	color: ColorType | undefined
	dayCount: number | null | undefined
	isPrivate: boolean | null | undefined
}
const BucketInfo = ({ isLoading, title, color, dayCount, isPrivate }: BucketInfoProps) => {
	const hasInfoData =
		title === undefined || color === undefined || dayCount === undefined || isPrivate === undefined

	if (isLoading || hasInfoData) {
		return <BucketInfoSkeleton />
	}

	return (
		<>
			{/* // Todo: Skeleton ui 적용되도록 같이 컴포넌트 수정 필요 */}
			{/* // Todo: 달성 여부도 ProfileBucket 컴포넌트에서 받도록 수정 필요*/}
			<ProfileBucket
				isLoading={isLoading}
				title={title}
				color={color}
				dayCount={dayCount}
				isLock={isPrivate}
			/>
		</>
	)
}

export default BucketInfo
