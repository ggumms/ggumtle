import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../pages/Radar/api'
import { IUserInfo } from '../pages/Radar/types/bottomSheet'

export const queryKeys = {
	userinfo: 'userinfo',
}

export const useUserInfoQuery = (userId: number | undefined) => {
	const { isLoading, data: userInfo } = useQuery<IUserInfo>({
		queryKey: ['previewUser', userId],
		queryFn: getUserInfo,
		enabled: !!userId,
	})

	return { isLoading, userInfo }
}
