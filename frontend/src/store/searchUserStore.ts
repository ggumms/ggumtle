import { create } from 'zustand'
import { ColorType } from '../interfaces'

export interface IUserSearch {
	bucketColor: ColorType
	bucketId: number
	bucketTitle: string
	isAchieved: boolean
	isFollowing: boolean
	userId: number
	userNickname: string
	userProfileImage: string
}
interface ISearchUserStore {
	userList: IUserSearch[]
	addUserList: (list: IUserSearch[]) => void
	resetUserList: () => void
	searching: boolean
	setSearching: (searching: boolean) => void
}

export const useSearchUserStore = create<ISearchUserStore>((set) => ({
	userList: [],
	addUserList: (list) =>
		set(() => ({
			userList: [...list],
		})),
	resetUserList: () =>
		set(() => ({
			userList: [],
		})),
	searching: false,
	setSearching: (searching) => set({ searching: searching }),
}))
