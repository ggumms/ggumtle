import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IMyUserInfo } from './../interfaces'

interface IUserStore {
	userInfo: IMyUserInfo | null
	setUserInfo: (user: IMyUserInfo) => void
	resetUserInfo: () => void
}

export const useCurrentUserStore = create<IUserStore>()(
	devtools((set) => ({
		userInfo: null,
		setUserInfo: (user: IMyUserInfo) => set(() => ({ userInfo: user })),
		resetUserInfo: () => set(() => ({ userInfo: null })),
	}))
)
