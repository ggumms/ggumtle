import { CategoryType, ColorType, selectedInfoType } from '../interfaces'

export type PeriodType = 'none' | 'oneDay' | 'oneWeek' | 'twoWeeks' | 'oneMonth' | 'oneYear'

export interface ICategorySlice {
	// State
	selectedInfo: selectedInfoType
	// Action
	addCategory: (selectedItem: CategoryType) => void
	removeCategory: (selectedItem: CategoryType) => void
	resetCategory: () => void
}

export interface IBucketColorSlice {
	bucketColor: ColorType | null
	changeBucketColor: (color: ColorType) => void
	resetBucketColor: () => void
}

export interface IBucketTitleSlice {
	bucketTitle: string
	changeBucketTitle: (title: string) => void
	resetBucketTitle: () => void
}

export interface ITimeCapsuleSlice {
	timeCapsule: string
	changeTimeCapsule: (title: string) => void
	resetTimeCapsule: () => void
}

export interface IBucketImageSlice {
	bucketImage: File | null
	changeBucketImage: (image: File) => void
	resetBucketImage: () => void
}

export interface IStartDateSlice {
	createdDate: Date
	changeCreatedDate: (date: Date) => void
	resetCreatedDate: () => void
}

export interface IPeriodSlice {
	period: PeriodType
	changePeriod: (period: PeriodType) => void
	resetPeriod: () => void
}

export interface IIsPrivateSlice {
	isPrivate: boolean
	changeIsPrivate: (privateValue: boolean) => void
	resetIsPrivate: () => void
}

// :: Reaction
type ReactionType = '멋져요' | '응원해요' | '나도할래'
type ReactionCountType = {
	[key in ReactionType]: number
}
