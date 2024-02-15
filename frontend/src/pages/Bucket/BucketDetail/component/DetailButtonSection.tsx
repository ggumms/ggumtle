import ShareButton from '../../../../components/ShareButton'
import AchieveDreamButton from './AcheiveDreamButton'
import ShowReviewButton from './ShowReviewButton'
import WriteReviewButton from './WriteReviewButton'

import { IBucketDetailInfo } from '../../../../interfaces'
import useIsMyBucket from '../../../../hooks/useIsMyBucket'

interface IDetailButtonSectionProps {
	hasReview: boolean
	bucketDetailInfo: IBucketDetailInfo
	bucketId: string
}

const DetailButtonSection = ({
	hasReview,
	bucketDetailInfo,
	bucketId,
}: IDetailButtonSectionProps) => {
	const isOtherBucket = !useIsMyBucket(bucketDetailInfo.bucketInfo)

	return (
		<>
			<ShareButton />
			{isOtherBucket ? (
				hasReview && bucketDetailInfo.bucketInfo.reviewId ? (
					<ShowReviewButton reviewId={bucketDetailInfo.bucketInfo.reviewId} />
				) : (
					<></>
				)
			) : bucketDetailInfo.bucketInfo.achievementDate === null ? (
				bucketId && <AchieveDreamButton id={bucketId} />
			) : hasReview && bucketDetailInfo.bucketInfo.reviewId ? (
				<ShowReviewButton reviewId={bucketDetailInfo.bucketInfo.reviewId} />
			) : (
				bucketId && <WriteReviewButton bucketId={bucketId} />
			)}
		</>
	)
}

export default DetailButtonSection
