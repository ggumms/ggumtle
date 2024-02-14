import { useEffect, useState } from 'react'
import { getReviewDetail } from '../pages/Review/api'

const useHasReview = (reviewId: number | null | undefined) => {
	const [hasReview, setHasReview] = useState(false)

	const fetchBriefInfo = async (reviewId: number) => {
		const { reviewCreatedDate } = await getReviewDetail(reviewId)
		setHasReview(!!reviewCreatedDate)
	}
	useEffect(() => {
		reviewId ? fetchBriefInfo(reviewId) : setHasReview(false)
	}, [reviewId])

	return hasReview
}

export default useHasReview
