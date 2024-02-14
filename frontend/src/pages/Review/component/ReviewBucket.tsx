import { Link } from 'react-router-dom'
import ProfileBucket from '../../../components/ProfileBucket'
import { ColorType } from '../../../interfaces'

interface IReviewBucketProps {
	isLoading: boolean
	title: string | undefined
	color: ColorType | undefined
	dayCount: number | undefined
	bucketId: number | undefined
}
const ReviewBucket = ({ isLoading, title, color, dayCount, bucketId }: IReviewBucketProps) => {
	const isEmptyData =
		title === undefined || color === undefined || dayCount === undefined || bucketId === undefined
	if (isEmptyData) {
		return <></>
	}
	return (
		<Link to={`/bucket/${bucketId}`}>
			<ProfileBucket
				type="reviewDetail"
				isLoading={isLoading}
				title={title}
				color={color}
				dayCount={dayCount}
				isLock={false}
				isDone={true}
			/>
		</Link>
	)
}

export default ReviewBucket
