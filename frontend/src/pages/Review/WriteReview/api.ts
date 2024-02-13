import { instance } from '../../../axios'

// :: Review
// - Get request
interface IReviewBrief {
	hasTemp: boolean
	hasReview: boolean
	title: string
	context: string
}
interface IGetReviewInfoRes {
	result: string
	reviewBrief: IReviewBrief
}
export const getReviewInfo = async (bucketId: string): Promise<IReviewBrief> => {
	const reviewRes = await instance.get<IGetReviewInfoRes>(`review/brief/${bucketId}`)
	return reviewRes.data.reviewBrief
}

// - Post request
interface IPostReviewRes {
	result: string
	reviewId: number
}
export const postReview = async (
	bucketId: string,
	title: string,
	context: string,
	isPosted: boolean
): Promise<number> => {
	const reviewRes = await instance.post<IPostReviewRes>(`review`, {
		bucketId,
		title,
		context,
		isPosted,
	})
	return reviewRes.data.reviewId
}

// - Put request
interface IPutReviewRes {
	result: string
	reviewId: number
}
export const putReview = async (
	bucketId: string,
	title: string,
	context: string
): Promise<number> => {
	const reviewRes = await instance.post<IPutReviewRes>(`review`, {
		bucketId,
		title,
		context,
	})
	return reviewRes.data.reviewId
}
