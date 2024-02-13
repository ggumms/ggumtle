import axios from 'axios'
import { IMyUserInfo } from './interfaces'

export const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

instance.interceptors.request.use(
	(config) => {
		config.headers['Content-Type'] = 'application/json'
		config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_USER1_TOKEN}`

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// :: User
// - Get current user request
interface IGetUserInfoRes {
	result: string
	selfInfo: IMyUserInfo
}

export const getMyInfo = async (): Promise<IMyUserInfo> => {
	const userRes = await instance.get<IGetUserInfoRes>(`user/self-info`)
	return userRes.data.selfInfo
}
