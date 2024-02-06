import { QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

export const getRadarUsers = async () => {
	return instance
		.get('radar/following', {
			headers: {
				Accept: 'application/json;charset=UTF-8',
				Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,
			},
		})
		.then((response) => response.data.radar)
}

// @TODO: 카테고리 파라미터 추가하기
export const getRadarBuckets = async ({ queryKey }: QueryFunctionContext) => {
	const [_, categories] = queryKey

	console.log(categories)
	return instance
		.get('radar/total', {
			headers: {
				Accept: 'application/json;charset=UTF-8',
				Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,
			},
			params: {
				categories: categories,
			},
		})
		.then((response) => response.data.radar)
}
