import { create, SlicePattern, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ColorType } from '../interfaces'
import { defaultCategories } from '../utils/category'
import { immer } from 'zustand/middleware/immer'
import { startOfToday } from 'date-fns'
import {
	IBucketColorSlice,
	IBucketImageSlice,
	IBucketTitleSlice,
	ICategorySlice,
	IIsPrivateSlice,
	IPeriodSlice,
	IStartDateSlice,
	ITimeCapsuleSlice,
	PeriodType,
} from '../types/bucket'

declare module 'zustand' {
	type SlicePattern<T, S = T> = StateCreator<
		S & T,
		[['zustand/immer', never], ['zustand/devtools', never]],
		[],
		T
	>
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

const createBucketImageSlice: StateCreator<IBucketImageSlice> = (set) => ({
	bucketImage: null,
	changeBucketImage: (image: File) =>
		set(() => {
			return { bucketImage: image }
		}),
	resetBucketImage: () =>
		set(() => {
			return { bucketImage: null }
		}),
})

const createStartDateSlice: StateCreator<IStartDateSlice> = (set) => ({
	createdDate: startOfToday(),
	changeCreatedDate: (date: Date) =>
		set(() => {
			return { createdDate: date }
		}),
	resetCreatedDate: () =>
		set(() => {
			return { createdDate: startOfToday() }
		}),
})

const createPeriodSlice: StateCreator<IPeriodSlice> = (set) => ({
	period: 'twoWeeks',
	changePeriod: (period: PeriodType) =>
		set(() => {
			return { period: period }
		}),
	resetPeriod: () =>
		set(() => {
			return { period: 'twoWeeks' }
		}),
})

const createIsPrivateSlice: StateCreator<IIsPrivateSlice> = (set) => ({
	isPrivate: false,
	changeIsPrivate: (privateValue: boolean) =>
		set(() => {
			return { isPrivate: privateValue }
		}),
	resetIsPrivate: () =>
		set(() => {
			return { isPrivate: false }
		}),
})

// 버킷 정보를 관리하는 전역 State
// - 버킷 생성
// - 상세 버킷 조회
export const useBucketStore = create<
	ICategorySlice &
		IBucketColorSlice &
		IBucketTitleSlice &
		ITimeCapsuleSlice &
		IBucketImageSlice &
		IStartDateSlice &
		IPeriodSlice &
		IIsPrivateSlice
>()(
	devtools(
		immer((...a) => ({
			...createSelectedCategorySlice(...a),
			...createBucketColorSlice(...a),
			...createBucketTitleSlice(...a),
			...createTimeCapsuleSlice(...a),
			...createBucketImageSlice(...a),
			...createStartDateSlice(...a),
			...createPeriodSlice(...a),
			...createIsPrivateSlice(...a),
		}))
	)
)
