import { QueryFunctionContext } from '@tanstack/query-core'
import { instance } from '../../../axios'
import { IBucketInfo } from '../../../interfaces'
import { IReactionInfo, ReactionType } from '../../../types/bucket'

interface IGetBucketInfoRes {
	result: string
	bucketInfo: IBucketInfo
}
export const getBucketInfo = async ({ queryKey }: QueryFunctionContext): Promise<IBucketInfo> => {
	const [, id] = queryKey
	const bucketRes = await instance.get<IGetBucketInfoRes>(`bucket/info/${id}`)
	return bucketRes.data.bucketInfo
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
