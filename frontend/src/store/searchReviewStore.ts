import { create } from 'zustand'
import { ColorType } from '../interfaces'

export interface IReviewSearch {
	reviewId: number
	reviewTitle: string
	reviewCreatedDate: string
	reviewReactionCount: number
	reviewCommentCount: number
	bucketId: number
	bucketTitle: string
	bucketColor: ColorType
	daysSinceDream: number
	writerId: number
	writerNickname: string
	writerProfileImage: string
}

interface ISearchReviewStore {
	reviewList: IReviewSearch[]
	addReviewList: (list: IReviewSearch[]) => void
	resetReviewList: () => void
	searching: boolean
	setSearching: (searching: boolean) => void
}

export const useSearchReviewStore = create<ISearchReviewStore>((set) => ({
	reviewList: [],
	addReviewList: (list) =>
		set(() => ({
			reviewList: [...list],
		})),
	resetReviewList: () =>
		set(() => ({
			reviewList: [],
		})),
	searching: false,
	setSearching: (searching) => set({ searching: searching }),
}))
