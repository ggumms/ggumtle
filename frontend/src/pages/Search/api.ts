import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getUserSearch = async ({ queryKey }: QueryFunctionContext) => {
	const [, word, page, size] = queryKey
	return await instance
		.get(`user/search?word=${word}&page=${page}&size=${size}`)
		.then((response) => response.data.userSearchList)
		.catch((e) => console.log(`[Error] ${e}`))
}
export const getBucketSearch = async ({ queryKey }: QueryFunctionContext) => {
	const [, word, page, size] = queryKey
	return await instance
		.get(`bucket/search?word=${word}&page=${page}&size=${size}`)
		.then((response) => {
			console.log('bucket api 호출됨', response.data.bucketSearchList.searchList.content)
			return response.data.bucketSearchList
		})
		.catch((e) => console.log(`[Error] ${e}`))
}
