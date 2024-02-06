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
		console.log(error, 'helo')
		return Promise.reject(error)
	}
)

export const getRadarUsers = async () => {
	return instance.get('radar/following').then((response) => response.data.radar)
}

export const getPreviewUser = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return instance.get(`user/${userId}`).then((response) => response.data.userInfo)
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
