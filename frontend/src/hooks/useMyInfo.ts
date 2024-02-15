import { useQuery } from "@tanstack/react-query"
import { getMy } from "../pages/Radar/api"
import { IUserInfo } from "../pages/Radar/types/bottomSheet"

export const queryKeys = {
	userinfo: 'userinfo',
}

export const useMyInfoQuery = () => {
	return useQuery<IUserInfo>({
		queryKey: ['myInfo'],
		queryFn: getMy,
	})
}
