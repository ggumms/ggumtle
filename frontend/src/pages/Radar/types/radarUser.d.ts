export type PosType = {
	x: number
	y: number
}
export interface IRadarUser {
	pos: PosType
	userId: number
	userProfileImage: string
	userNickname: string
	isFollowing?: boolean | null
	bucketId?: number | null
	bucketTitle?: string | null
	bucketColor?: string | null
	bucketAchievement?: boolean | null
}

export interface IAddUser {
	pos: PosType
	user: IRadarUser
	setUsers1st?: (value: React.SetStateAction<IRadarUser[]>) => void
	setUsers2nd?: (value: React.SetStateAction<IRadarUser[]>) => void
	setUsers3rd?: (value: React.SetStateAction<IRadarUser[]>) => void
}

export interface IUserPosition {
	setUsers1st?: (value: React.SetStateAction<IRadarUser[]>) => void
	setUsers2nd?: (value: React.SetStateAction<IRadarUser[]>) => void
	setUsers3rd?: (value: React.SetStateAction<IRadarUser[]>) => void
	user: IRadarUser
	radius: number
	maxNum: number
}
