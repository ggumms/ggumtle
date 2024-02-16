import { QueryFunctionContext } from '@tanstack/query-core'
import { instance } from '../../axios'
import { IReactionInfo, IReviewDetail, ReactionType } from '../../types/bucket'
import { ICommentListInfo } from '../../interfaces'
import axios from 'axios'

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
	const reviewRes = await instance.get<IGetReviewBriefRes>(`/review/brief/${bucketId}`)
	return reviewRes.data.reviewBrief
}
// - Get detail request
interface IGetReviewDetailRes {
	result: string
	review: IReviewDetail
}
export const getReviewDetail = async (reviewId: number): Promise<IReviewDetail> => {
	const reviewRes = await instance.get<IGetReviewDetailRes>(`/review/${reviewId}`)
	return reviewRes.data.review
}
export const getReviewDetailQuery = async ({
	queryKey,
}: QueryFunctionContext): Promise<IReviewDetail> => {
	const [, reviewId] = queryKey
	const reviewRes = await instance.get<IGetReviewDetailRes>(`/review/${reviewId}`)
	return reviewRes.data.review
}
// - Post review request
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
	const reviewRes = await instance.post<IPostReviewRes>(`/review`, {
		bucketId,
		title,
		context,
		isPosted,
	})
	return reviewRes.data.reviewId
}

// - Put review request
interface IPutReviewRes {
	result: string
	reviewId: number
}
export const putReview = async (
	bucketId: string,
	title: string,
	context: string
): Promise<number> => {
	const reviewRes = await instance.put<IPutReviewRes>(`/review`, {
		bucketId,
		title,
		context,
	})
	return reviewRes.data.reviewId
}

// - Delete review request
interface IDeleteReviewDetailRes {
	result: string
	message: string
}
export const deleteReviewDetail = async (reviewId: number): Promise<'success' | 'fail'> => {
	const reviewRes = await instance.delete<IDeleteReviewDetailRes>(`/review/${reviewId}`)
	return reviewRes.data.result === 'ok' ? 'success' : 'fail'
}

// :: Review Image
interface IReviewImageRes {
	result: string
	imageUrl: string
}
export const postReviewImage = async (image: FormData | null): Promise<string> => {
	console.log(image?.get('image'))
	const axiosConfig = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,
		},
		withCredentials: true,
	}
	const imageRes = await axios.post<IReviewImageRes>(
		`${import.meta.env.VITE_BASE_URL}/review/image`,
		image,
		axiosConfig
	)
	return imageRes.data.imageUrl
}

// :: Reaction
// - Get Request
interface IGetReactionRes {
	result: string
	reviewReactions: IReactionInfo
}
export const getReviewReaction = async ({
	queryKey,
}: QueryFunctionContext): Promise<IReactionInfo> => {
	const [, id] = queryKey
	const reactionRes = await instance.get<IGetReactionRes>(`/review/${id}/reaction`)
	return reactionRes.data.reviewReactions
}
// - Post Request
interface IPostReactionRes {
	result: string
	myReaction: ReactionType
}
export const postReviewReaction = async (
	id: string,
	reactionType: ReactionType
): Promise<'success' | 'fail'> => {
	const reactionRes = await instance.post<IPostReactionRes>(`/review/${id}/reaction`, {
		reaction: reactionType,
	})
	if (reactionRes.data.result === 'ok' && reactionRes.data.myReaction === reactionType) {
		return 'success'
	}
	return 'fail'
}

// :: Comment
// - Get Request
//   - QueryFunctionContext에서 pageParam을 사용하기 위해 제네릭 적용
interface IGetCommentRes {
	result: string
	reviewCommentList: { commentList: ICommentListInfo }
}
export const getReviewCommentList = async ({
	queryKey,
	pageParam,
}: QueryFunctionContext<string[], number>): Promise<ICommentListInfo> => {
	const [, id] = queryKey
	const fetchSize = import.meta.env.VITE_PAGE_SIZE

	const commentRes = await instance.get<IGetCommentRes>(
		`/comment/review/${id}?page=${pageParam}&size=${fetchSize}`
	)

	return commentRes.data.reviewCommentList.commentList
}
// - Post Request
interface IPostCommentRes {
	result: string
	message: string
}
export const postReviewComment = async (
	id: string,
	context: string
): Promise<'success' | 'fail'> => {
	const commentRes = await instance.post<IPostCommentRes>(`/comment/review/${id}`, { context })
	return commentRes.data.result === 'ok' ? 'success' : 'fail'
}
// - Delete Request
interface IDeleteCommentRes {
	result: string
	message: string
}
export const deleteReviewComment = async (id: number): Promise<'success' | 'fail'> => {
	const commentRes = await instance.delete<IDeleteCommentRes>(`/comment/review/${id}`)
	return commentRes.data.result === 'ok' ? 'success' : 'fail'
}
// - Put Request
interface IPutCommentRes {
	result: string
	message: string
}
export const putReviewComment = async (
	id: number,
	context: string
): Promise<'success' | 'fail'> => {
	const commentRes = await instance.put<IPutCommentRes>(`/comment/review/${id}`, { context })
	return commentRes.data.result === 'ok' ? 'success' : 'fail'
}

// :: LikeButton
interface IPostLikeRes {
	result: string
	message: string
}
// Todo : postBucketLikeStatus 이름 변경 필요, LikeRes 소문자로 변경하기
export const putReviewLikeStatus = async (commentId: number): Promise<'success' | 'fail'> => {
	const LikeRes = await instance.put<IPostLikeRes>(`/comment/review/like/${commentId}`)
	return LikeRes.data.result === 'ok' ? 'success' : 'fail'
}
