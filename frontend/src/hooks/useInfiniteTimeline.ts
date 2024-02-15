import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getTimeline } from '../pages/UserPage/api'
import { ITimelineItem } from '../interfaces'

const useInfiniteTimeline = (userId: number, doing: boolean, done: boolean, review: boolean) => {
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['timeline', userId, doing, done, review],
			queryFn: getTimeline,
			initialPageParam: 0,
			getNextPageParam: (lastPageInfo) => {
				return lastPageInfo.last ? null : lastPageInfo.number + 1
			},
		})

	const timeLineData = useMemo(() => {
		let result: ITimelineItem[] = []
		if (data) {
			data.pages.forEach((pageInfo) => {
				result = [...result, ...pageInfo.content]
			})
		}
		return result
	}, [data])

	return {
		timeLineData,
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	}
}

export default useInfiniteTimeline
