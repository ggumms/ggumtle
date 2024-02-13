import { create } from 'zustand'
import { CategoryType, ColorType } from '../interfaces'

export interface IBucketSearch {
	bucketId: number
	category: CategoryType[]
	color: ColorType
	commentCount: number
	createdDate: string
	dayCount: number
	isAchieved: boolean
	reactionCount: number
	title: string
}
interface ISearchBucketStore {
	bucketList: IBucketSearch[]
	addBucketList: (list: IBucketSearch[]) => void
	resetBucketList: () => void
	searching: boolean
	setSearching: (searching: boolean) => void
}

export const useSearchBucketStore = create<ISearchBucketStore>((set) => ({
	bucketList: [],
	addBucketList: (list) =>
		set(() => ({
			bucketList: [...list],
		})),
	resetBucketList: () =>
		set(() => ({
			bucketList: [],
		})),
	searching: false,
	setSearching: (searching) => set({ searching: searching }),
}))
