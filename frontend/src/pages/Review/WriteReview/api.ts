import { instance } from '../../../axios'
import { IReviewDetail } from '../../../types/bucket'

// :: Review
// - Get brief request
interface IReviewBrief {
	hasTemp: boolean
	hasReview: boolean
	title: string
	context: string
}
interface IGetReviewBriefRes {
	result: string
	reviewBrief: IReviewBrief
}
export const getReviewBrief = async (bucketId: string): Promise<IReviewBrief> => {
	const reviewRes = await instance.get<IGetReviewBriefRes>(`review/brief/${bucketId}`)
	return reviewRes.data.reviewBrief
}
// - Get detail request

interface IGetReviewDetailRes {
	result: string
	review: IReviewDetail
}
export const getReviewDetail = async (reviewId: number): Promise<IReviewDetail> => {
	const reviewRes = await instance.get<IGetReviewDetailRes>(`review/${reviewId}`)
	return reviewRes.data.review
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
