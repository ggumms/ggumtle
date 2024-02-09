import { QueryFunctionContext } from '@tanstack/query-core'
import { instance } from '../../../axios'
import { IBucketInfo } from '../../../interfaces'

interface IGetBucketInfoRes {
	result: string
	bucketInfo: IBucketInfo
}
export const getBucketInfo = async ({ queryKey }: QueryFunctionContext): Promise<IBucketInfo> => {
	const [, id] = queryKey
	const bucketRes = await instance.get<IGetBucketInfoRes>(`bucket/info/${id}`)
	return bucketRes.data.bucketInfo
}
