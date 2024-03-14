import { QueryFunctionContext } from '@tanstack/query-core'
import { instance } from '../../../axios'
import { IBucketInfo, ICommentListInfo, UserInfoType } from '../../../interfaces'
import { IReactionInfo, ReactionType } from '../../../types/bucket'
// Todo : api 함수 이름들 다 fetch 들어가도록 수정

// :: Bucket
// - Get Detail Request
interface IGetBucketInfoRes {
	result: string
	bucketInfo: IBucketInfo
}
interface IGetUserInfoRes {
	result: string
	userInfo: UserInfoType
}
interface IBucketDetailInfo {
	bucketInfo: IBucketInfo
	userInfo: UserInfoType
}
export const getBucketDetailInfo = async ({
	queryKey,
}: QueryFunctionContext): Promise<IBucketDetailInfo> => {
	const [, id] = queryKey
	const bucketRes = await instance.get<IGetBucketInfoRes>(`/bucket/info/${id}`)
	const { writerId } = bucketRes.data.bucketInfo
	const userRes = await instance.get<IGetUserInfoRes>(`/user/${writerId}`)
	return { bucketInfo: bucketRes.data.bucketInfo, userInfo: userRes.data.userInfo }
}
// - Delete Request
interface IDeleteBucketRes {
	result: string
	message: string
}
export const deleteBucket = async (id: string): Promise<'success' | 'fail'> => {
	const deleteRes = await instance.delete<IDeleteBucketRes>(`/bucket/${id}`)
	return deleteRes.data.result === 'ok' ? 'success' : 'fail'
}

// :: Reaction
// - Get Request
interface IGetReactionRes {
	result: string
	bucketReaction: IReactionInfo
}
export const getBucketReaction = async ({
	queryKey,
}: QueryFunctionContext): Promise<IReactionInfo> => {
	const [, id] = queryKey
	const reactionRes = await instance.get<IGetReactionRes>(`/bucket/reaction/${id}`)
	return reactionRes.data.bucketReaction
}
// - Post Requestc
interface IPostReactionRes {
	result: string
	userReaction: ReactionType
}
export const postBucketReaction = async (
	id: string,
	reactionType: ReactionType
): Promise<'success' | 'fail'> => {
	const reactionRes = await instance.post<IPostReactionRes>(`/bucket/reaction/`, {
		bucketId: id,
		userReaction: reactionType,
	})
	if (reactionRes.data.result === 'ok' && reactionRes.data.userReaction === reactionType) {
		return 'success'
	}
	return 'fail'
}

// :: Comment
// - Get Request
//   - QueryFunctionContext에서 pageParam을 사용하기 위해 제네릭 적용
interface IGetCommentRes {
	result: string
	bucketCommentList: { commentList: ICommentListInfo }
}
export const getBucketCommentList = async ({
	queryKey,
	pageParam,
}: QueryFunctionContext<string[], number>): Promise<ICommentListInfo> => {
	const [, id] = queryKey
	const fetchSize = import.meta.env.VITE_COMMENT_PAGE_SIZE

	const commentRes = await instance.get<IGetCommentRes>(
		`/comment/bucket/${id}?page=${pageParam}&size=${fetchSize}`
	)

	return commentRes.data.bucketCommentList.commentList
}
// - Post Request
interface IPostCommentRes {
	result: string
	message: string
}
export const postBucketComment = async (
	id: string,
	context: string
): Promise<'success' | 'fail'> => {
	const commentRes = await instance.post<IPostCommentRes>(`/comment/bucket/${id}`, { context })
	return commentRes.data.result === 'ok' ? 'success' : 'fail'
}
// - Delete Request
interface IDeleteCommentRes {
	result: string
	message: string
}
export const deleteBucketComment = async (id: number): Promise<'success' | 'fail'> => {
	const commentRes = await instance.delete<IDeleteCommentRes>(`/comment/bucket/${id}`)
	return commentRes.data.result === 'ok' ? 'success' : 'fail'
}
// - Put Request
interface IPutCommentRes {
	result: string
	message: string
}
export const putBucketComment = async (
	id: number,
	context: string
): Promise<'success' | 'fail'> => {
	const commentRes = await instance.put<IPutCommentRes>(`/comment/bucket/${id}`, { context })
	return commentRes.data.result === 'ok' ? 'success' : 'fail'
}

// :: LikeButton
interface IPostLikeRes {
	result: string
	message: string
}
// Todo : postBucketLikeStatus 이름 변경 필요, LikeRes 소문자로 변경하기
export const postLikeStatus = async (commentId: number): Promise<'success' | 'fail'> => {
	const LikeRes = await instance.put<IPostLikeRes>(`/comment/bucket/like/${commentId}`)
	return LikeRes.data.result === 'ok' ? 'success' : 'fail'
}
