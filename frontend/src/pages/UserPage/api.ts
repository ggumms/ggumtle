import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getUserStats = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	try {
		return await instance.get(`user/stats/${userId}`).then((response) => response.data)
	} catch (error) {
		console.log(error)
	}
}

export const putFollow = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return await instance.get(`user/stats/${userId}`).then((response) => response.data)
}
