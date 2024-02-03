export type BucketPosType = {
	x: number
	y: number
}
export interface IBucket {
	pos: BucketPosType
	userId: string
	userProfileImage: string
	userNickname: string
	isFollowing?: boolean | null
	bucketId?: number | null
	bucketTitle?: string | null
	bucketColor?: string | null
	bucketAchievement?: boolean | null
}

export interface IAddBucket {
	pos: BucketPosType
	bucket: IBucket
	setBuckets1st?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets2nd?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets3rd?: (value: React.SetStateAction<IBucket[]>) => void
}

export interface IBucketPosition {
	setBuckets1st?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets2nd?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets3rd?: (value: React.SetStateAction<IBucket[]>) => void
	bucket: IBucket
	radius: number
	maxNum: number
}
