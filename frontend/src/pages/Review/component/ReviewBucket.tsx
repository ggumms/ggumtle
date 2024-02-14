import ProfileBucket from '../../../components/ProfileBucket'
import { ColorType } from '../../../interfaces'

interface IReviewBucketProps {
	isLoading: boolean
	title: string | undefined
	color: ColorType | undefined
	dayCount: number | undefined
}
const ReviewBucket = ({ isLoading, title, color, dayCount }: IReviewBucketProps) => {
	const isEmptyData = title === undefined || color === undefined || dayCount === undefined
	if (isEmptyData) {
		return <></>
	}
	return (
		<>
			<ProfileBucket
				type="reviewDetail"
				isLoading={isLoading}
				title={title}
				color={color}
				dayCount={dayCount}
				isLock={false}
				isDone={true}
			/>
		</>
	)
}

export default ReviewBucket
