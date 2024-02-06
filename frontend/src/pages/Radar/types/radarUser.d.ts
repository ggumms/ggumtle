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
	setUsers1st?: React.Dispatch<React.SetStateAction<IRadarUser[]>>
	setUsers2nd?: React.Dispatch<React.SetStateAction<IRadarUser[]>>
	setUsers3rd?: React.Dispatch<React.SetStateAction<IRadarUser[]>>
}

export interface IUserPosition {
	setUsers1st?: React.Dispatch<React.SetStateAction<IRadarUser[]>>
	setUsers2nd?: React.Dispatch<React.SetStateAction<IRadarUser[]>>
	setUsers3rd?: React.Dispatch<React.SetStateAction<IRadarUser[]>>
	user: IRadarUser
	radius: number
	maxNum: number
}
