import ProfileBucket from '../../../../components/ProfileBucket'
import { ColorType } from '../../../../interfaces'
import BucketInfoSkeleton from './Skeleton/BucketInfoSkeleton'

interface BucketInfoProps {
	isLoading: boolean
	title: string | null | undefined
	color: ColorType | undefined
	dayCount: number | null | undefined
	isPrivate: boolean | null | undefined
	isDone: string | null | undefined
}
const BucketInfo = ({ isLoading, title, color, dayCount, isPrivate, isDone }: BucketInfoProps) => {
	const hasInfoData =
		title === undefined ||
		color === undefined ||
		dayCount === undefined ||
		isPrivate === undefined ||
		isDone === undefined

	if (isLoading || hasInfoData) {
		return <BucketInfoSkeleton />
	}

	return (
		<>
			{/* // Todo: Skeleton ui 적용되도록 같이 컴포넌트 수정 필요 */}
			{/* // Todo: 달성 여부도 ProfileBucket 컴포넌트에서 받도록 수정 필요*/}
			<ProfileBucket
				type="bucketDetail"
				isLoading={isLoading}
				title={title}
				color={color}
				dayCount={dayCount}
				isLock={isPrivate}
				isDone={isDone !== null}
			/>
		</>
	)
}

export default BucketInfo
