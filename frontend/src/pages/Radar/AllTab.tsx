import { useEffect, useState } from 'react'
import { ProfileAvatar } from '../../assets/svgs'
import Radar from './components/radar/Radar'
import BucketItem from './components/radar/BucketItem'
import { PosType } from './types/radarUser'
import { useQuery } from '@tanstack/react-query'
import { getRadarBuckets, getRadarInitBuckets } from './api'
import ButtonArea from './components/ButtonArea'
import BucketBottomSheet from './components/bottomSheet/BucketBottomSheet'
import useBucketBottomSheet from '../../hooks/useBucketBottomSheet'
import { useRadarCategoryStore } from '../../store/radarCategoryStore'
import BackDots from './components/radar/BackDots'
import { circle1Pos, circle2Pos, circle3Pos } from './utils/pos'
import { useMyInfoQuery } from '../../hooks/useMyInfo'
import { Link } from 'react-router-dom'

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
		queryKey: ['radarBuckets', categories],
		queryFn: getRadarBuckets,
	})

	const { isLoading: isMyInfoLoading, data: myInfo} = useMyInfoQuery()
	
	const { isLoading: isInitLoading, data: radarInitBucket, refetch: refetchInit, isRefetching: isRefetchingInit } = useQuery<IRadarBucketList>({
		queryKey: ['initBuckets'],
		queryFn: getRadarInitBuckets,
	})

	const refreshRadar = () => {
		if(!categories) {
			refetchInit()
		}
		setBuckets1st([])
		setBuckets2nd([])
		setBuckets3rd([])
		refetch()
	}

	useEffect(() => {
		refreshRadar()
	}, [categories])

	// 초기 화면
	useEffect(() => {
		const idx = Math.floor(Math.random() * circle1Pos.length)
		!isInitLoading &&
			radarInitBucket?.circle1 &&
			radarInitBucket.circle1.forEach((bucket, index) => {
				setTimeout(
					() => {
						setBuckets1st((prev) => {
							if(prev.length >= 3) return prev
							
							const isUserExist = prev.some((e) => e.bucketId === bucket.bucketId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...bucket, pos: circle1Pos[idx][index]}]
							}
							return prev
						})
					},
					200
				)
			})

		const idx2 = Math.floor(Math.random() * circle2Pos.length)
		!isInitLoading &&
			radarInitBucket?.circle2 &&
			radarInitBucket.circle2.forEach((bucket, index) => {
				setTimeout(
					() => {
						setBuckets2nd((prev) => {
							if(prev.length >= 4) return prev
							
							const isUserExist = prev.some((e) => e.bucketId === bucket.bucketId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...bucket, pos: circle2Pos[idx2][index]}]
							}
							return prev
						})
					},
					500
				)
			})

		const idx3 = Math.floor(Math.random() * circle3Pos.length)
		!isInitLoading &&
			radarInitBucket?.circle3 &&
			radarInitBucket.circle3.forEach((bucket, index) => {
				setTimeout(
					() => {
						setBuckets3rd((prev) => {
							if(prev.length >= 5) return prev
							
							const isUserExist = prev.some((e) => e.bucketId === bucket.bucketId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...bucket, pos: circle3Pos[idx3][index]}]
							}
							return prev
						})
					},
					800
				)
			})
	}, [isInitLoading, isRefetchingInit])

	// @TODO: 로직을 분리하고 싶다..
	// 카테고리 선택시
	useEffect(() => {
		const idx = Math.floor(Math.random() * circle1Pos.length)
		!isLoading &&
			radarBucket?.circle1 &&
			radarBucket.circle1.forEach((bucket, index) => {
				setTimeout(
					() => {
						setBuckets1st((prev) => {
							if(prev.length >= 3) return prev
							
							const isUserExist = prev.some((e) => e.bucketId === bucket.bucketId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...bucket, pos: circle1Pos[idx][index]}]
							}
							return prev
						})
					},
					200
				)
			})

		const idx2 = Math.floor(Math.random() * circle2Pos.length)
		!isLoading &&
			radarBucket?.circle2 &&
			radarBucket.circle2.forEach((bucket, index) => {
				setTimeout(
					() => {
						setBuckets2nd((prev) => {
							if(prev.length >= 4) return prev
							
							const isUserExist = prev.some((e) => e.bucketId === bucket.bucketId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...bucket, pos: circle2Pos[idx2][index]}]
							}
							return prev
						})
					},
					500
				)
			})

		const idx3 = Math.floor(Math.random() * circle3Pos.length)
		!isLoading &&
			radarBucket?.circle3 &&
			radarBucket.circle3.forEach((bucket, index) => {
				setTimeout(
					() => {
						setBuckets3rd((prev) => {
							if(prev.length >= 5) return prev
							
							const isUserExist = prev.some((e) => e.bucketId === bucket.bucketId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...bucket, pos: circle3Pos[idx3][index]}]
							}
							return prev
						})
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
					<Link to="/mypage" className="z-30">
							{
							!isMyInfoLoading && myInfo ? 
								<div className={`w-16 h-16 rounded-full overflow-hidden`} >
									<img src={myInfo.userProfileImage} alt="" className="w-full h-full object-cover" />
								</div>
							: <ProfileAvatar className="h-14 w-14" /> }
						</Link>
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
