import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getBucketCommentList } from '../pages/Bucket/BucketDetail/api'
import { ICommentItem } from '../interfaces'

const useInfiniteCommentList = (id: string) => {
	const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['comments', id],
			queryFn: getBucketCommentList,
			initialPageParam: 0,
			getNextPageParam: (lastPageInfo) => {
				return lastPageInfo.last ? null : lastPageInfo.number + 1
			},
		})

	const commentListData = useMemo(() => {
		let result: ICommentItem[] = []
		if (data) {
			data.pages.forEach((pageInfo) => {
				result = [...result, ...pageInfo.content]
			})
		}
		return result
	}, [data])

	return {
		commentListData,
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	}
}

export default useInfiniteCommentList
