import { useQuery } from '@tanstack/react-query'
import { getBucketSearch, getUserSearch } from '../pages/Search/api'

export const useSearchUser = (word: string) => {
	return useQuery({
		// @TODO: 임의로 지정해둔 페이지 및 개수 -> 추후 무한스크롤 구현하기
		queryKey: ['searchUser', word, 0, 20],
		queryFn: getUserSearch,
		enabled: !!word,
		staleTime: 500,
	})
}

export const useSearchBucket = (word: string) => {
	return useQuery({
		queryKey: ['searchBucket', word, 0, 20],
		queryFn: getBucketSearch,
		enabled: !!word,
		staleTime: 500,
	})
}
