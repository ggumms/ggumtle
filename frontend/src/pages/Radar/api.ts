import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getRadarUsers = async () => {
	try {
		return await instance.get('radar/following').then((response) => response.data.radar)
	} catch (error) {
		console.log(error)
	}
}

export const getUserInfo = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	try {
		return await instance.get(`user/${userId}`).then((response) => response.data.userInfo)
	} catch (error) {
		console.log(error)
	}
}
export const getBucketPreview = async ({ queryKey }: QueryFunctionContext) => {
	const [, bucketId] = queryKey
	try {
		return await instance.get(`bucket/info/${bucketId}`).then((response) => response.data.bucketInfo)
	} catch (error) {
		console.log(error)
	}
}

// @TODO: 카테고리 파라미터 추가하기
export const getRadarBuckets = async ({ queryKey }: QueryFunctionContext) => {
	const [, categories] = queryKey

	try {
		return await instance
			.get('radar/total', {
				params: {
					categories: categories,
				},
			})
			.then((response) => response.data.radar)
	} catch (error) {
		console.log(error)
	}
}
