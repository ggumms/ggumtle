export interface IUserInfo {
	userId: number
	userProfileImage: string
	userNickname: string
	category: CategoryType[]
	bucketId: number
	bucketTitle: string
	dayCount: number
	bucketColor: ColorType
	isAchieved: boolean
	owner: boolean
	isFollowing: boolean
}

export interface UserBottomSheetProp {
	userId: number | null
	togglePreview: () => void
	isMaxup: boolean
	sheet: React.RefObject<HTMLDivElement>
	content: React.RefObject<HTMLDivElement>
}
