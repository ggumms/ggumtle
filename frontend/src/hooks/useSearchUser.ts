import { useQuery } from '@tanstack/react-query'
import { getUserSearch } from '../pages/Search/api'

export const useSearchUser = (word: string) => {
	return useQuery({
		queryKey: ['searchUser', word],
		queryFn: getUserSearch,
		enabled: !!word,
	})
}
