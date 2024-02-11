import { IRadarBucket } from '../AllTab'

export interface IAddBucket {
	pos: PosType
	bucket: IRadarBucket
	setBuckets1st?: (value: React.SetStateAction<IRadarBucket[]>) => void
	setBuckets2nd?: (value: React.SetStateAction<IRadarBucket[]>) => void
	setBuckets3rd?: (value: React.SetStateAction<IRadarBucket[]>) => void
}

export interface IBucketPosition {
	setBuckets1st?: (value: React.SetStateAction<IRadarBucket[]>) => void
	setBuckets2nd?: (value: React.SetStateAction<IRadarBucket[]>) => void
	setBuckets3rd?: (value: React.SetStateAction<IRadarBucket[]>) => void
	bucket: IRadarBucket
	radius: number
	maxNum: number
}
