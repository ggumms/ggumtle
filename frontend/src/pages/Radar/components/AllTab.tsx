import { useEffect, useState } from 'react'
import { ProfileAvatar } from '../../../assets/svgs'
import Radar from './radar/Radar'
import BucketItem from './radar/BucketItem'
import { PosType } from '../types/radarUser'
import { useQuery } from '@tanstack/react-query'
import { getRadarBuckets } from '../api'

export interface IRadarBucket {
	pos: PosType
	bucketId: number
	title: string
	bucketPicture: string
	color: string
}

interface IRadarBucketList {
	circle1: IRadarBucket[]
	circle2: IRadarBucket[]
	circle3: IRadarBucket[]
	refresh: boolean
}

const AllTab = () => {
	const { isLoading, data: radar } = useQuery<IRadarBucketList>({
		queryKey: ['radarBucket'],
		queryFn: getRadarBuckets,
	})

	const [buckets1st, setBuckets1st] = useState<IRadarBucket[]>([])
	const [buckets2nd, setBuckets2nd] = useState<IRadarBucket[]>([])
	const [buckets3rd, setBuckets3rd] = useState<IRadarBucket[]>([])

	const handleOpenPreview = (bucketId: number) => {
		console.log(bucketId)
	}

	// 첫 번째 레이더 (가장 안쪽)
	useEffect(() => {
		const radius = 19
		const maxNum = 3
		!isLoading &&
			radar!.circle1.forEach((bucket, index) => {
				setTimeout(
					() => {
						bucket1stPositioning({ setBuckets1st, bucket, radius, maxNum })
					},
					200 * index + 100 * Math.random()
				)
			})
	}, [isLoading, refresh, radar])

	return (
		<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center overflow-hidden">
			<Radar>
				<ProfileAvatar className="h-14 w-14" />
			</Radar>
			<div className="absolute top-[calc(50%-5px)] left-1/2 w-[110%] aspect-square transform translate-x-[-50%] translate-y-[-50%]">
				{buckets1st.map((bucket) => (
					<BucketItem
						key={bucket.bucketId}
						bucket={bucket}
						type="first"
						handleOpenPreview={handleOpenPreview}
					/>
				))}
				{buckets2nd.map((bucket) => (
					<BucketItem
						key={bucket.bucketId}
						bucket={bucket}
						type="second"
						handleOpenPreview={handleOpenPreview}
					/>
				))}
				{buckets3rd.map((bucket) => (
					<BucketItem
						key={bucket.bucketId}
						bucket={bucket}
						type="third"
						handleOpenPreview={handleOpenPreview}
					/>
				))}
			</div>
		</div>
	)
}

export default AllTab
