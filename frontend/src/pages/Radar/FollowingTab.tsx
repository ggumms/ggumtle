import { useEffect, useState } from 'react'
import UserItem from './components/radar/UserItem'
import ButtonArea from './components/ButtonArea'
import Radar from './components/radar/Radar'
import { ProfileAvatar } from '../../assets/svgs'
import { getRadarUsers } from './api'
import { useQuery } from '@tanstack/react-query'
import { IRadarUser } from './types/radarUser'
import UserBottomSheet from './components/bottomSheet/UserBottomSheet'
import useUserBottomSheet from '../../hooks/useUserBottomSheet'
import { Link } from 'react-router-dom'
import BackDots from './components/radar/BackDots'
import { circle1Pos, circle2Pos, circle3Pos } from './utils/pos'
import { useMyInfoQuery } from '../../hooks/useMyInfo'

export interface IUserSimple {
	userId: number
	userProfileImage: string
	userNickname: string
}

interface IRadarUserList {
	circle1: IRadarUser[]
	circle2: IRadarUser[]
	circle3: IRadarUser[]
	refresh: boolean
}

// @TODO: 알림 페이지에서 뒤로가기 했을때 레이더 리렌더링 되지 않도록 수정하기
// @TODO: 리렌더링 횟수 줄이기
const FollowingTab = () => {
	
		const [users1st, setUsers1st] = useState<IRadarUser[]>([])
		const [users2nd, setUsers2nd] = useState<IRadarUser[]>([])
		const [users3rd, setUsers3rd] = useState<IRadarUser[]>([])
	const {
		isLoading,
		data: radar,
		refetch,
	} = useQuery<IRadarUserList>({
		queryKey: ['radarUser'],
		queryFn: getRadarUsers,
	})

	const { isLoading: isMyInfoLoading, data: myInfo} = useMyInfoQuery()

	const { sheet, content, openPreview, isMaxup, togglePreview } = useUserBottomSheet()
	const [userId, setUserId] = useState<number | null>(null)

	const handleOpenPreview = (userId: number) => {
		openPreview()
		setUserId(userId)
	}

	const refreshRadar = () => {
		setUsers1st([])
		setUsers2nd([])
		setUsers3rd([])
		refetch()
	}

	// 첫 번째 레이더 (가장 안쪽)
	useEffect(() => {
		// setUsers1st([])
		const idx = Math.floor(Math.random() * circle1Pos.length)
		!isLoading &&
			radar &&
			radar.circle1.forEach((user, index) => {

				setTimeout(
					() => {
						setUsers1st((prev) => {
							if(prev.length >= 3) return prev
							
							const isUserExist = prev.some((e) => e.userId === user.userId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...user, pos: circle1Pos[idx][index]}]
							}
							return prev
						})
					},
					200
				)
			})
	}, [radar, isLoading])

	// 두 번째 레이더
	useEffect(() => {
		// setUsers2nd([])
		const idx = Math.floor(Math.random() * circle2Pos.length)
		!isLoading &&
			radar &&
			radar.circle2.forEach((user, index) => {
				setTimeout(
					() => {
						setUsers2nd((prev) => {
							if(prev.length >= 4) return prev
							const isUserExist = prev.some((e) => e.userId === user.userId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...user, pos: circle2Pos[idx][index]}]
							}
							return prev
						})
					},
				500
				)
			})
	}, [radar, isLoading])

	// 세 번째 레이더
	useEffect(() => {
		// setUsers3rd([])
		const idx = Math.floor(Math.random() * circle3Pos.length)
		!isLoading &&
			radar &&
			radar.circle3.forEach((user, index) => {
				setTimeout(
					() => {
						setUsers3rd((prev) => {
							if(prev.length >= 5) return prev
							const isUserExist = prev.some((e) => e.userId === user.userId)

							// // 존재하지 않으면 추가
							if (!isUserExist) {
								return [...prev, { ...user, pos: circle3Pos[idx][index]}]
							}
							return prev
						})
					},
				800
				)
			})
	}, [radar, isLoading])

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
					{users1st.map((user) => (
						<UserItem
							key={user.userId}
							user={user}
							type="first"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{users2nd.map((user) => (
						<UserItem
							key={user.userId}
							user={user}
							type="second"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{users3rd.map((user) => (
						<UserItem
							key={user.userId}
							user={user}
							type="third"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
				</div>
			</div>

			{/* @TODO: preview가 아닌 부분을 클릭해도 closePreview 되도록 */}
			<ButtonArea refreshRadar={refreshRadar} />
			<UserBottomSheet
				userId={userId}
				togglePreview={togglePreview}
				isMaxup={isMaxup}
				sheet={sheet}
				content={content}
			/>
		</div>
	)
}

export default FollowingTab
