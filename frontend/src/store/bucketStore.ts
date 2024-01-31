import { create, SlicePattern, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CategoryType, ColorType, selectedInfoType } from '../interfaces'
import { defaultCategories } from '../utils/category'
import { immer } from 'zustand/middleware/immer'

declare module 'zustand' {
	type SlicePattern<T, S = T> = StateCreator<
		S & T,
		[['zustand/immer', never], ['zustand/devtools', never]],
		[],
		T
	>
}

interface ICategorySlice {
	// State
	selectedInfo: selectedInfoType
	// Action
	addCategory: (selectedItem: CategoryType) => void
	removeCategory: (selectedItem: CategoryType) => void
	resetCategory: () => void
}

interface IBucketColorSlice {
	bucketColor: ColorType | null
	changeBucketColor: (color: ColorType) => void
	resetBucketColor: () => void
}

interface IBucketTitleSlice {
	bucketTitle: string
	changeBucketTitle: (title: string) => void
	resetBucketTitle: () => void
}

interface ITimeCapsuleSlice {
	timeCapsule: string
	changeTimeCapsule: (title: string) => void
	resetTimeCapsule: () => void
}

// immer 사용으로 인한 return문 제거
const createSelectedCategorySlice: SlicePattern<ICategorySlice> = (set) => ({
	selectedInfo: { ...defaultCategories },
	addCategory: (selectedItemName) =>
		set((state) => {
			state.selectedInfo[selectedItemName] = true
		}),
	removeCategory: (selectedItemName) =>
		set((state) => {
			state.selectedInfo[selectedItemName] = false
		}),
	resetCategory: () =>
		set(() => {
			return { selectedInfo: { ...defaultCategories } }
		}),
})

const createBucketColorSlice: StateCreator<IBucketColorSlice> = (set) => ({
	bucketColor: null,
	changeBucketColor: (color: ColorType) =>
		set(() => {
			return { bucketColor: color }
		}),
	resetBucketColor: () =>
		set(() => {
			return { bucketColor: null }
		}),
})

const createBucketTitleSlice: StateCreator<IBucketTitleSlice> = (set) => ({
	bucketTitle: '',
	changeBucketTitle: (text: string) =>
		set(() => {
			return { bucketTitle: text }
		}),
	resetBucketTitle: () =>
		set(() => {
			return { bucketTitle: '' }
		}),
})

const createTimeCapsuleSlice: StateCreator<ITimeCapsuleSlice> = (set) => ({
	timeCapsule: '',
	changeTimeCapsule: (text: string) =>
		set(() => {
			return { timeCapsule: text }
		}),
	resetTimeCapsule: () =>
		set(() => {
			return { timeCapsule: '' }
		}),
})

// 버킷 정보를 관리하는 전역 State
// - 버킷 생성
// - 상세 버킷 조회
export const useBucketStore = create<
	ICategorySlice & IBucketColorSlice & IBucketTitleSlice & ITimeCapsuleSlice
>()(
	devtools(
		immer((...a) => ({
			...createSelectedCategorySlice(...a),
			...createBucketColorSlice(...a),
			...createBucketTitleSlice(...a),
			...createTimeCapsuleSlice(...a),
		}))
	)
)
