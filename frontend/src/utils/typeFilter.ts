import { categoryData } from './category'
import { CategoryType, ColorType, IMyUserInfo, IOtherUserInfo, PeriodType } from '../interfaces'
import { IProfileUserInfo } from './../interfaces'
import { ReactionType } from '../types/bucket'

// :: User
export const isCommentUserType = (
	userInfo: IMyUserInfo | IOtherUserInfo | IProfileUserInfo
): userInfo is IProfileUserInfo => {
	return !('owner' in userInfo && 'category' in userInfo)
}

export const isMyUserType = (
	userInfo: IMyUserInfo | IOtherUserInfo | IProfileUserInfo
): userInfo is IMyUserInfo => {
	return (
		'owner' in userInfo &&
		'category' in userInfo &&
		userInfo.owner === true &&
		userInfo.isFollowing === null
	)
}

export const isOtherUserType = (
	userInfo: IMyUserInfo | IOtherUserInfo | IProfileUserInfo
): userInfo is IOtherUserInfo => {
	return (
		'owner' in userInfo &&
		'category' in userInfo &&
		userInfo.owner === false &&
		typeof userInfo.isFollowing === 'boolean'
	)
}

// :: Bucket
export const isCategoryType = (input: string): input is CategoryType => {
	const matchingCount = Object.keys(categoryData).filter((category) => category === input).length
	return matchingCount > 0
}

export const isColorType = (input: string): input is ColorType => {
	const matchingCount = Object.values(categoryData).filter((color) => color === input).length
	return matchingCount > 0
}

export const isReactionType = (reaction: string): reaction is ReactionType => {
	return reaction === '멋져요' || reaction === '응원해요' || reaction === '나도할래'
}

export const isValidatePeriod = (
	period: PeriodType
): period is 'oneDay' | 'oneWeek' | 'twoWeeks' | 'oneMonth' | 'oneYear' => {
	return period !== null
}

export const isPeriodType = (period: string | null): period is PeriodType => {
	return (
		period === null ||
		period === 'oneDay' ||
		period === 'oneWeek' ||
		period === 'twoWeeks' ||
		period === 'oneMonth' ||
		period === 'oneYear'
	)
}
