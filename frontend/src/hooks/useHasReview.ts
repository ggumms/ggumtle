import { useEffect, useState } from 'react'
import { getReviewBrief } from '../pages/Review/WriteReview/api'

const useHasReview = (bucketId: string | undefined) => {
	const [hasReview, setHasReview] = useState(false)

	const fetchBriefInfo = async (bucketId: string) => {
		const { hasReview } = await getReviewBrief(bucketId)
		setHasReview(hasReview)
	}
	useEffect(() => {
		bucketId && fetchBriefInfo(bucketId)
	}, [bucketId])

	return hasReview
}

export default useHasReview
