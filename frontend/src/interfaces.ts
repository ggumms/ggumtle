import { MouseEventHandler, ReactNode } from 'react'

export interface IBucketWide {
	title: string
	color: ColorType
	dDay: number
	isLock: boolean
}

export interface BucketInfoProps {
	type: 'profile' | 'bucketDetail' | 'reviewDetail'
	isLoading: boolean | null
	title: string | null
	color: ColorType
	dayCount: number | null
	isLock: boolean | null
	isDone: boolean | null
}

// 헤더 아이콘 type
export interface IMenu {
	[key: string]: ReactNode | string | null
}

// 아이콘에 할당할 함수 type
export interface IMenuFunc {
	left_func: MouseEventHandler<HTMLDivElement> | undefined
	right_func: MouseEventHandler<HTMLDivElement> | undefined
}

export interface IHeaderProp {
	menu: IMenu
	func: IMenuFunc
}

export type ClassType = Record<string, string>

export type CategoryType =
	| '환경'
	| '자선활동'
	| '인간관계'
	| '휴식'
	| '연애'
	| '운동'
	| '여행'
	| '언어'
	| '문화'
	| '도전'
	| '취미'
	| '직장'

export type ColorType =
	| 'green'
	| 'lightGreen'
	| 'red'
	| 'yellow'
	| 'pink'
	| 'mint'
	| 'orange'
	| 'skyBlue'
	| 'purple'
	| 'beige'
	| 'sandPink'
	| 'brown'

export type CategoryDataType = Record<CategoryType, ColorType>

export type selectedInfoType = Record<CategoryType, boolean>

export interface IBaseUserInfo {
	userId: number
	userProfileImage: string | null
	userNickname: string
	isFollowing: boolean | null
}
export interface ITitleBucket {
	bucketId: number | null
	bucketTitle: string | null
	bucketColor: ColorType | null
	isAchieved: boolean
	dayCount?: number
}

export interface IMyUserInfo extends IBaseUserInfo, ITitleBucket {
	category: CategoryType[]
	owner: true
}

export interface IOtherUserInfo extends IBaseUserInfo, ITitleBucket {
	category: CategoryType[]
	owner: false
}

export interface IProfileUserInfo extends IBaseUserInfo, ITitleBucket {}

export type UserInfoType = IMyUserInfo | IOtherUserInfo | IProfileUserInfo

export type PeriodType = null | 'oneDay' | 'oneWeek' | 'twoWeeks' | 'oneMonth' | 'oneYear'

// Todo : IBucketInfo와 비교해서 리팩토링 필요
export interface IBaseBucketInfo {
	title: string
	timeCapsule: string | null
	reminderDate: PeriodType
	latitude: number | null
	longitude: number | null
	address: string | null
	color: ColorType
	category: CategoryType[]
	createdDate: string
	isPrivate: boolean
}

export interface IBucketInfo extends IBaseBucketInfo {
	bucketPicture: string | null
	writerId: number
	reviewId: number | null
	dayCount: number
	achievementDate: string | null
}

export interface IBucketDetailInfo {
	bucketInfo: IBucketInfo
	userInfo: UserInfoType
}

export type TimeUnitType = 'min' | 'hour' | 'day' | 'month' | 'year'

export interface ICommentItem {
	id: number
	context: string
	writer: IProfileUserInfo
	numberOfLikes: number
	timeUnit: TimeUnitType
	time: number
	createdDate: string
	updatedDate: string
}

export interface ICommentListInfo {
	content: ICommentItem[]
	pageable: {
		pageNumber: number
		pageSize: number
		sort: {
			empty: boolean
			sorted: boolean
			unsorted: boolean
		}
		offset: number
		paged: boolean
		unpaged: boolean
	}
	last: boolean
	totalElements: number
	totalPages: number
	size: number
	number: number
	sort: {
		empty: boolean
		sorted: boolean
		unsorted: boolean
	}
	first: boolean
	numberOfElements: number
	empty: boolean
}

export interface ITimelineItem {
	id: number
	type: 'REVIEW' | 'BUCKET'
	isAchieved: boolean
	title: string
	context: string
	day: number
	color: ColorType
	images: string[]
	categories: CategoryType[]
	reactionCount: number
	commentCount: number
	createdDate: string
}

export interface ITimelineInfo {
	content: ITimelineItem[]
	pageable: {
		pageNumber: number
		pageSize: number
		sort: {
			empty: boolean
			sorted: boolean
			unsorted: boolean
		}
		offset: number
		paged: boolean
		unpaged: boolean
	}
	last: boolean
	totalElements: number
	totalPages: number
	size: number
	number: number
	sort: {
		empty: boolean
		sorted: boolean
		unsorted: boolean
	}
	first: boolean
	numberOfElements: number
	empty: boolean
}
