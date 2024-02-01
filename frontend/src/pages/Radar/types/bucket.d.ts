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
	setBuckets1st?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets2nd?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets3rd?: (value: React.SetStateAction<IBucket[]>) => void
}

export interface IBucketPosition {
	setBuckets1st?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets2nd?: (value: React.SetStateAction<IBucket[]>) => void
	setBuckets3rd?: (value: React.SetStateAction<IBucket[]>) => void
	user: string
	radius: number
	maxNum: number
}
