// @TODO: 데이터 형식 어떻게 받아올지는 추후 논의

import { IRadarBucket } from '../AllTab'
import { IRadarItemDirection, RadarElemType } from './UserItem'

export interface IBucketStyle {
	size: string
}

export interface IBucketItemStyle {
	first: { style: IBucketStyle; direction: IRadarItemDirection }
	second: { style: IBucketStyle; direction: IRadarItemDirection }
	third: { style: IBucketStyle; direction: IRadarItemDirection }
}

const BucketItemStyle: IBucketItemStyle = {
	first: {
		style: {
			size: 'w-14 h-14',
		},
		direction: {
			left: 45,
			bottom: 42,
		},
	},
	second: {
		style: {
			size: 'w-12 h-12',
		},
		direction: {
			left: 45,
			bottom: 40,
		},
	},
	third: {
		style: {
			size: 'w-10 h-10',
		},
		direction: {
			left: 46,
			bottom: 42,
		},
	},
}
interface BucketItemProps {
	bucket: IRadarBucket
	type: RadarElemType
	handleOpenPreview: (bucketId: number) => void
}
const BucketItem = ({ bucket, type, handleOpenPreview }: BucketItemProps) => {
	const itemStyle: { position: 'absolute'; left: string; bottom: string } = {
		position: 'absolute',
		left: `${BucketItemStyle[type].direction.left + bucket.pos.x}%`,
		bottom: `${BucketItemStyle[type].direction.bottom + bucket.pos.y}%`,
	}
	return (
		<div
			onClick={() => handleOpenPreview(bucket.bucketId)}
			className="inline-flex flex-col items-center animate-floating"
			style={itemStyle}
		>
			<div className={`${BucketItemStyle[type].style.size} rounded-2xl overflow-hidden animate-fadeIn`}>
				{/* <img src={bucket.bucketPicture} alt="" className="w-full h-full object-cover" /> */}
				<img src="/public/dummy.PNG" alt="" className="w-full h-full object-cover" />
			</div>
		</div>
	)
}

export default BucketItem
