import { QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

instance.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_USER1_TOKEN}`

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export const getRadarUsers = async () => {
	return instance.get('radar/following').then((response) => response.data.radar)
}

export const getUserPreview = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return instance.get(`user/${userId}`).then((response) => response.data.userInfo)
}
export const getBucketPreview = async ({ queryKey }: QueryFunctionContext) => {
	const [, bucketId] = queryKey
	return instance.get(`bucket/info/${bucketId}`).then((response) => response.data.bucketInfo)
}

// @TODO: 카테고리 파라미터 추가하기
export const getRadarBuckets = async ({ queryKey }: QueryFunctionContext) => {
	const [, categories] = queryKey

	return instance
		.get('radar/total', {
			params: {
				categories: categories,
			},
		})
		.then((response) => response.data.radar)
}
