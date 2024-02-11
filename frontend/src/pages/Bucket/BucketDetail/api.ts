import { QueryFunctionContext } from '@tanstack/query-core'
import { instance } from '../../../axios'
import { IBucketInfo, UserInfoType } from '../../../interfaces'
import { IReactionInfo, ReactionType } from '../../../types/bucket'

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
	const bucketRes = await instance.get<IGetBucketInfoRes>(`bucket/info/${id}`)
	const { writerId } = bucketRes.data.bucketInfo
	const userRes = await instance.get<IGetUserInfoRes>(`user/${writerId}`)
	return { bucketInfo: bucketRes.data.bucketInfo, userInfo: userRes.data.userInfo }
}

interface IGetReactionRes {
	result: string
	bucketReaction: IReactionInfo
}
export const getBucketReaction = async ({
	queryKey,
}: QueryFunctionContext): Promise<IReactionInfo> => {
	const [, id] = queryKey
	const reactionRes = await instance.get<IGetReactionRes>(`bucket/reaction/${id}`)
	return reactionRes.data.bucketReaction
}

interface IPostReactionRes {
	result: string
	userReaction: ReactionType
}

export const postBucketReaction = async (
	id: string,
	reactionType: ReactionType
): Promise<'success' | 'fail'> => {
	const reactionRes = await instance.post<IPostReactionRes>(`bucket/reaction/`, {
		bucketId: id,
		userReaction: reactionType,
	})
	if (reactionRes.data.result === 'ok' && reactionRes.data.userReaction === reactionType) {
		return 'success'
	}
	return 'fail'
}
