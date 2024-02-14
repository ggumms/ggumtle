import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IBucketInfo } from '../interfaces'
import { IReviewDetail } from '../types/bucket'

// :: Bucket Detail
interface IDetailBucketStore {
	detailBucket: IBucketInfo | null
	setDetailBucket: (detailBucket: IBucketInfo) => void
	resetDetailBucket: () => void
}
export const useDetailBucketStore = create<IDetailBucketStore>()(
	devtools((set) => ({
		detailBucket: null,
		setDetailBucket: (detailBucket: IBucketInfo) => set(() => ({ detailBucket: detailBucket })),
		resetDetailBucket: () => set(() => ({ detailBucket: null })),
	}))
)

// :: Comment
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

// :: Review Detail
interface IDetailReviewStore {
	detailReview: IReviewDetail | null
	setDetailReview: (detailReview: IReviewDetail) => void
	resetDetailReview: () => void
}
export const useDetailReviewStore = create<IDetailReviewStore>()(
	devtools((set) => ({
		detailReview: null,
		setDetailReview: (detailReview: IReviewDetail) => set(() => ({ detailReview: detailReview })),
		resetDetailReview: () => set(() => ({ detailReview: null })),
	}))
)
