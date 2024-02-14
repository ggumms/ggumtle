import { useEffect, useState } from 'react'
import { ProfileAvatar } from '../../assets/svgs'
import Radar from './components/radar/Radar'
import BucketItem from './components/radar/BucketItem'
import { PosType } from './types/radarUser'
import { useQuery } from '@tanstack/react-query'
import { getRadarBuckets } from './api'
import { bucket1stPositioning } from './utils/total/radar1st'
import ButtonArea from './components/ButtonArea'
import BucketBottomSheet from './components/bottomSheet/BucketBottomSheet'
import useBucketBottomSheet from '../../hooks/useBucketBottomSheet'
import { useRadarCategoryStore } from '../../store/radarCategoryStore'
import BackDots from './components/radar/BackDots'
import { bucket2ndPositioning } from './utils/total/radar2nd'
import { bucket3rdPositioning } from './utils/total/radar3rd'

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
	const { selectedCategory } = useRadarCategoryStore()

	const { sheet, content, openPreview, closePreview, isMaxup, togglePreview } =
		useBucketBottomSheet()
	const [buckets1st, setBuckets1st] = useState<IRadarBucket[]>([])
	const [buckets2nd, setBuckets2nd] = useState<IRadarBucket[]>([])
	const [buckets3rd, setBuckets3rd] = useState<IRadarBucket[]>([])

	const [bucketId, setBucketId] = useState<number | null>(null)
	const [categories, setCategories] = useState('')

	const handleOpenPreview = (bucketId: number) => {
		console.log('handleOpenPreview', bucketId)
		openPreview()
		setBucketId(bucketId)
	}

	const handleSubmitCategories = () => {
		setCategories(
			Object.entries(selectedCategory)
				.filter(([, value]) => value)
				.map(([key]) => key)
				.join(',')
		)
		closePreview()
	}

	const { isLoading, data: radarBucket, refetch } = useQuery<IRadarBucketList>({
		queryKey: ['categories', categories],
		queryFn: getRadarBuckets,
	})

	const refreshRadar = () => {
		setBuckets1st([])
		setBuckets2nd([])
		setBuckets3rd([])
		refetch()
	}

	useEffect(() => {
		refreshRadar()
	}, [categories])

	// 첫 번째 레이더 (가장 안쪽)
	useEffect(() => {
		console.log(radarBucket, "radarBucket")
		const radius = 19
		const maxNum = 3
		!isLoading &&
			radarBucket?.circle1 &&
			radarBucket.circle1.forEach((bucket) => {
				setTimeout(
					() => {
						bucket1stPositioning({ setBuckets1st, bucket, radius, maxNum })
					},
					200
				)
			})
	}, [isLoading, radarBucket])

	// 두 번째 레이더
	useEffect(() => {
		const radius = 34
		const maxNum = 6
		!isLoading &&
			radarBucket &&
			radarBucket.circle2.forEach((bucket) => {
				setTimeout(
					() => {
						bucket2ndPositioning({ setBuckets2nd, bucket, radius, maxNum })
					},
					500
				)
			})
	}, [isLoading, radarBucket])

	// 세 번째 레이더
	useEffect(() => {
		const radius = 50
		const maxNum = 9
		!isLoading &&
			radarBucket &&
			radarBucket.circle3.forEach((bucket) => {
				setTimeout(
					() => {
						bucket3rdPositioning({ setBuckets3rd, bucket, radius, maxNum })
					},
					800
				)
			})
	}, [isLoading, radarBucket])

	return (
		<div>
			<BackDots />
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

			<ButtonArea refreshRadar={refreshRadar} />
			<BucketBottomSheet
				bucketId={bucketId}
				setBucketId={setBucketId}
				togglePreview={togglePreview}
				handleSubmitCategories={handleSubmitCategories}
				isMaxup={isMaxup}
				sheet={sheet}
				content={content}
			/>
		</div>
	)
}

export default AllTab
