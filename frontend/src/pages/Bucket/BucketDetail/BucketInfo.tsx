import ProfileBucket from '../../../components/ProfileBucket'
import { ColorType } from '../../../interfaces'

interface BucketInfoProps {
	isLoading: boolean
	title: string | null
	color: ColorType
	dayCount: number | null
	isPrivate: boolean | null
}
const BucketInfo = ({ isLoading, title, color, dayCount, isPrivate }: BucketInfoProps) => {
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
