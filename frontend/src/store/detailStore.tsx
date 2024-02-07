import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ICommentStore {
	commentText: string
	setCommentText: (commentText: string) => void
	resetCommentText: () => void
}

export const useCommentStore = create<ICommentStore>()(
	devtools((set) => ({
		commentText: '',
		setCommentText: (commentText: string) => set(() => ({ commentText: commentText })),
		resetCommentText: () => set(() => ({ commentText: '' })),
	}))
)
