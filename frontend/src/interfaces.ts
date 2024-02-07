import { MouseEventHandler, ReactNode } from 'react'

export interface IBucketWide {
	title: string
	color: ColorType
	dDay: number
	isLock: boolean
}

export interface BucketInfoProps {
	isLoading: boolean | null
	title: string | null
	color: ColorType
	dayCount: number | null
	isLock: boolean | null
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

export interface IMyUserInfo {
	userId: number
	userProfileImage: string
	userNickname: string
	category: CategoryType[]
	bucketId: number | null
	bucketTitle: string
	dayCount: number
	color: ColorType
	isAchieved: boolean
	owner: true
	isFollowing: null
}
export interface IOtherUserInfo {
	userId: number
	userProfileImage: string
	userNickname: string
	category: CategoryType[]
	bucketId: number | null
	bucketTitle: string
	dayCount: number
	color: ColorType
	isAchieved: boolean
	owner: false
	isFollowing: boolean
}

export type UserInfoType = IMyUserInfo | IOtherUserInfo
