import {
	CategoryType,
	ColorType,
	IBucketInfo,
	PeriodType,
	selectedInfoType,
	IProfileUserInfo,
} from '../interfaces'

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

type ImageUrlType = string

export interface IBucketImageSlice {
	bucketImage: File | ImageUrlType | null
	changeBucketImage: (image: File | ImageUrlType | null) => void
	resetBucketImage: () => void
}

export interface IStartDateSlice {
	createdDate: Date | string
	changeCreatedDate: (date: Date | string) => void
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

export interface IResetStateSlice {
	resetAllState: () => void
}

export interface IAddStateSlice {
	addBucketState: (bucket: IBucketInfo) => void
}

// :: Reaction
export type ReactionType = '멋져요' | '응원해요' | '나도할래'
export type ReactionCountType = Record<ReactionType, number>
export interface IReactionInfo {
	userReaction: ReactionType
	reactionCounts: ReactionCountType
}

// :: Review
export interface IReviewDetail {
	writer: IProfileUserInfo
	bucketId: number
	bucketTitle: string
	bucketColor: ColorType
	daysSinceDream: number
	reviewTitle: string
	reviewContext: string
	reviewCreatedDate: string
	reviewUpdatedDate: string
	categories: CategoryType[]
}
