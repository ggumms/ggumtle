export type BucketPosType = {
	x: number
	y: number
}
export interface IBucket {
	user: string
	pos: BucketPosType
}

export interface IAddBucket {
	pos: BucketPosType
	user: string
	setBuckets: (value: React.SetStateAction<IBucket[]>) => void
}

export interface IBucketPosition {
	setBuckets: (value: React.SetStateAction<IBucket[]>) => void
	user: string
	radius: number
	maxNum: number
}