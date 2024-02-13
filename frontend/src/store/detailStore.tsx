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

// 페이지가 현재 어떤 상태인지 나타내는 state
// - 한 페이지(컴포넌트)에서 다양한 분기 처리(글 보기, 수정)을 처리하기 위해 사용
// - 리뷰는 별도의 페이지로 이동하기 때문에 pageType에 넣어주지 않음
interface IDetailPageTypeStore {
	pageType: 'read' | 'editComment' | 'editBucket'
	setPageType: (type: 'read' | 'editComment' | 'editBucket') => void
	resetPageType: () => void
}

export const useDetailPageTypeStore = create<IDetailPageTypeStore>()(
	devtools((set) => ({
		pageType: 'read',
		setPageType: (type: 'read' | 'editComment' | 'editBucket') => set(() => ({ pageType: type })),
		resetPageType: () => set(() => ({ pageType: 'read' })),
	}))
)
