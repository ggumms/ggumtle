import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api';

export const getRadarUsers = async () => {
	return await instance
		.get('/radar/following')
		.then((response) => response.data.radar)
		.catch((e) => console.log(e))
}

export const getUserInfo = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return await instance
		.get(`/user/${userId}`)
		.then((response) => response.data.userInfo)
		.catch((e) => console.log(e))
}
export const getBucketPreview = async ({ queryKey }: QueryFunctionContext) => {
	const [, bucketId] = queryKey
	return await instance
		.get(`/bucket/info/${bucketId}`)
		.then((response) => response.data.bucketInfo)
		.catch((e) => console.log(e))
}

// @TODO: 카테고리 파라미터 추가하기
export const getRadarBuckets = async ({ queryKey }: QueryFunctionContext) => {
	const [, categories] = queryKey

	return await instance
		.get('/radar/total', {
			params: {
				categories: categories,
			},
		})
		.then((response) => response.data.radar)
		.catch((e) => console.log(e))
}

export const getRadarInitBuckets = async () => {
	return await instance
		.get('/radar/total/init')
		.then((response) => response.data.radar)
		.catch((e) => console.log(e))
}

export const getMy = async () => {
	return await instance
		.get('/user/self-info')
		.then((response) => response.data.selfInfo)
		.catch((e) => console.log(e))
}

