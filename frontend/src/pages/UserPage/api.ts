import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getUserStats = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return instance.get(`user/stats/${userId}`).then((response) => response.data)
}
