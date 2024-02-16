import { QueryFunctionContext } from '@tanstack/react-query'
import { instance } from '../../api'
import { ITimelineInfo } from '../../interfaces'

export const getUserStats = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId] = queryKey
	return await instance
		.get(`/user/stats/${userId}`)
		.then((response) => response.data.userStats)
		.catch((e) => console.log(e))
}

interface ITimelineRes {
	result: string
	timeline: ITimelineInfo
}

export const getTimeline = async ({
	queryKey,
	pageParam,
}: QueryFunctionContext<(number | string | boolean)[], number>): Promise<ITimelineInfo> => {
	const [, userId, doing, done, review] = queryKey
	const fetchSize = import.meta.env.VITE_PAGE_SIZE

	const timelineRes = await instance.get<ITimelineRes>('/timeline', {
		params: {
			userId: userId,
			doing: doing,
			done: done,
			review: review,
			page: pageParam,
			size: fetchSize,
		},
	})

	return timelineRes.data.timeline
}

interface IFollow {
	userId: number
	isFollowing: boolean
}
export const updateFollow = async ({ userId, isFollowing }: IFollow) => {
	return await instance
		.put('/user/follow', {
			isFollowing: isFollowing,
			followee: userId,
		})
		.then((response) => response.data)
}
