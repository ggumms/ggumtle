import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'

export const getAlarm = async ({ queryKey }: QueryFunctionContext) => {
	const [, page, size] = queryKey
	return await instance
		.get(`alarm/?page=${page}&size=${size}`)
		.then((response) => {
			console.log('[get alarm]', response.data)
			return response.data.alarm
		})
		.catch((e) => console.log(`[Error] ${e}`))
}

export const updateAllRead = async () => {
	return await instance
		.put('alarm/all-read')
		.then((response) => response.data)
		.catch((e) => console.log(`[Error] ${e}`))
}
