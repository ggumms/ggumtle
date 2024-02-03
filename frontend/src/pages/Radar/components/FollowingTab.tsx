import { useEffect, useState } from 'react'
import UserItem from './radar/UserItem'
import { IBucket } from '../types/bucket'
import ButtonArea from './ButtonArea'
import PreviewBottomSheet from './preview/PreviewBottomSheet'
import Radar from './radar/Radar'
import { ProfileAvatar } from '../../../assets/svgs'
import { bucket1stPositioning } from '../utils/radar1st'
import { bucket2ndPositioning } from '../utils/radar2nd'
import { bucket3rdPositioning } from '../utils/radar3rd'
import useBottomSheet from '../../../hooks/usePreviewBottomSheet'
import { getRadarUsers } from '../api'
import { useQuery } from '@tanstack/react-query'

export interface IUserSimple {
	userId: number
	userProfileImage: string
	userNickname: string
}

interface IRadarUser {
	circle1: IBucket[]
	circle2: IBucket[]
	circle3: IBucket[]
	refresh: boolean
}

// @TODO: 알림 페이지에서 뒤로가기 했을때 레이더 리렌더링 되지 않도록 수정하기
const FollowingTab = () => {
	const { isLoading, data: radar } = useQuery<IRadarUser>({
		queryKey: ['radarUser'],
		queryFn: getRadarUsers,
	})

	const [buckets1st, setBuckets1st] = useState<IBucket[]>([])
	const [buckets2nd, setBuckets2nd] = useState<IBucket[]>([])
	const [buckets3rd, setBuckets3rd] = useState<IBucket[]>([])

	const { sheet, openPreview, closePreview, togglePreview } = useBottomSheet()
	const [userInfo, setUserInfo] = useState<IUserSimple | null>(null)

	const handleOpenPreview = (userId: number) => {
		closePreview()
		openPreview()
		// @TODO: userId로 user정보 호출 api
		setUserInfo({
			userId: 1,
			userProfileImage: 'url',
			userNickname: 'usung',
		})
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
					100 * index + 100 * Math.random()
				)
			})
	}, [isLoading])

	// 두 번째 레이더
	useEffect(() => {
		const radius = 34
		const maxNum = 6
		!isLoading &&
			radar!.circle2.forEach((bucket, index) => {
				setTimeout(
					() => {
						bucket2ndPositioning({ setBuckets2nd, bucket, radius, maxNum })
					},
					100 * index + 100 * Math.random()
				)
			})
	}, [isLoading])

	// 세 번째 레이더
	useEffect(() => {
		const radius = 50
		const maxNum = 9
		!isLoading &&
			radar!.circle3.forEach((bucket, index) => {
				setTimeout(
					() => {
						bucket3rdPositioning({ setBuckets3rd, bucket, radius, maxNum })
					},
					100 * index + 100 * Math.random()
				)
			})
	}, [isLoading])

	return (
		<div>
			<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center overflow-hidden">
				<Radar>
					<ProfileAvatar className="h-14 w-14" />
				</Radar>

				<div className="absolute top-[calc(50%-5px)] left-1/2 w-[110%] aspect-square transform translate-x-[-50%] translate-y-[-50%]">
					{buckets1st.map((item) => (
						<UserItem
							key={item.userId}
							user={item}
							type="first"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{buckets2nd.map((item) => (
						<UserItem
							key={item.userId}
							user={item}
							type="second"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{buckets3rd.map((item) => (
						<UserItem
							key={item.userId}
							user={item}
							type="third"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
				</div>
			</div>

			{/* @TODO: preview가 아닌 부분을 클릭해도 closePreview 되도록 */}
			<ButtonArea />
			<PreviewBottomSheet ref={sheet} userInfo={userInfo} togglePreview={togglePreview} />
		</div>
	)
}

export default FollowingTab
