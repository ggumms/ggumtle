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

// 더미 데이터
const users1 = ['a', 'b', 'c'] // 3
const users2 = ['a', 'b', 'c', 'd'] // 4명
const users3 = ['a', 'b', 'c', 'd', 'e'] // 5명

export interface IUserSimple {
	userId: number
	userProfileImage: string
	userNickname: string
}

// @TODO: 알림 페이지에서 뒤로가기 했을때 레이더 리렌더링 되지 않도록 수정하기
const FollowingTab = () => {
	const [buckets1st, setBuckets1st] = useState<IBucket[]>([])
	const [buckets2nd, setBuckets2nd] = useState<IBucket[]>([])
	const [buckets3rd, setBuckets3rd] = useState<IBucket[]>([])
	const { sheet, openPreview, closePreview, togglePreview } = useBottomSheet()
	const [userInfo, setUserInfo] = useState<IUserSimple | null>(null)

	const handleOpenPreview = () => {
		closePreview()
		console.log('open!', sheet)
		openPreview()
		setUserInfo({
			userId: 1,
			userProfileImage: 'url',
			userNickname: 'usung',
		})
	}
	// handleOpenPreview();
	// @TODO: 추후 실제 데이터로 api 통신 시에 데이터 형식에 따라 코드 대폭 수정 예정
	useEffect(() => {
		console.log(buckets1st)
		const radius = 19
		const maxNum = 3
		users1.forEach((user, index) => {
			setTimeout(
				() => {
					bucket1stPositioning({ setBuckets1st, user, radius, maxNum })
				},
				100 * index + 100 * Math.random()
			)
		})
	}, [])

	useEffect(() => {
		console.log(buckets2nd)
		const radius = 34
		const maxNum = 6
		users2.forEach((user, index) => {
			setTimeout(
				() => {
					bucket2ndPositioning({ setBuckets2nd, user, radius, maxNum })
				},
				100 * index + 100 * Math.random()
			)
		})
	}, [])
	useEffect(() => {
		console.log(buckets3rd)
		const radius = 50
		const maxNum = 9
		users3.forEach((user, index) => {
			setTimeout(
				() => {
					bucket3rdPositioning({ setBuckets3rd, user, radius, maxNum })
				},
				100 * index + 100 * Math.random()
			)
		})
	})

	return (
		<div>
			<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center overflow-hidden">
				<Radar>
					<ProfileAvatar className="h-14 w-14" />
				</Radar>

				<div className="absolute top-[calc(50%-5px)] left-1/2 w-[110%] aspect-square transform translate-x-[-50%] translate-y-[-50%]">
					{buckets1st.map((item, index) => (
						// @TODO: UserItem key 추후 userId로 변경
						<UserItem
							key={index}
							pos={item.pos}
							type="first"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{buckets2nd.map((item, index) => (
						// @TODO: 레이더 라인별 UserItem 크기 조절
						<UserItem
							// key값 변경
							key={index}
							pos={item.pos}
							type="second"
							handleOpenPreview={handleOpenPreview}
						/>
					))}
					{buckets3rd.map((item, index) => (
						// @TODO: 레이더 라인별 UserItem 크기 조절
						<UserItem
							// key값 변경
							key={index}
							pos={item.pos}
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
