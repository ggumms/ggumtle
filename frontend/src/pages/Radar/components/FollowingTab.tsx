import { useEffect, useState } from 'react'
import { bucketPositioning } from '../utils'
import UserItem from './UserItem'
import { IBucket } from '../types/bucket'
import ButtonArea from './ButtonArea'
import PreviewBottomSheet from './preview/PreviewBottomSheet'
import Radar from './radar/Radar'
import { ProfileAvatar } from '../../../assets/svgs'

// 더미 데이터
const users1 = ['a', 'b', 'c', 'd', 'e', 'f']
const users2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const users3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'o', 'p', 'q']

// @TODO: 알림 페이지에서 뒤로가기 했을때 레이더 리렌더링 되지 않도록 수정하기
const FollowingTab = () => {
	const [buckets, setBuckets] = useState<IBucket[]>([])

	// @TODO: 추후 실제 데이터로 api 통신 시에 데이터 형식에 따라 코드 대폭 수정 예정
	useEffect(() => {
		console.log(buckets)
		const radius = 16.5
		const maxNum = 5
		users1.forEach((user, index) => {
			setTimeout(
				() => {
					bucketPositioning({ setBuckets, user, radius, maxNum })
				},
				100 * index + 50 * Math.random()
			)
		})
	}, [])
	useEffect(() => {
		console.log(buckets)
		const radius = 34
		const maxNum = 10
		users2.forEach((user, index) => {
			setTimeout(
				() => {
					bucketPositioning({ setBuckets, user, radius, maxNum })
				},
				100 * index + 50 * Math.random()
			)
		})
	}, [])
	useEffect(() => {
		console.log(buckets)
		const radius = 50
		const maxNum = 13
		users3.forEach((user, index) => {
			setTimeout(
				() => {
					bucketPositioning({ setBuckets, user, radius, maxNum })
				},
				100 * index + 50 * Math.random()
			)
		})
	})

	return (
		<div className="">
			<div className="w-full h-[calc(100vh-5rem)] flex justify-center items-center overflow-hidden">
				<Radar>
					<ProfileAvatar className="h-14 w-14" />
				</Radar>

				<div className="absolute top-[calc(50%-5px)] left-1/2 w-[110%] aspect-square transform translate-x-[-50%] translate-y-[-50%]">
					{buckets.map((item, index) => (
						// @TODO: 레이더 라인별 UserItem 크기 조절
						<UserItem
							// key값 변경
							key={index}
							pos={item.pos}
							// item={item.}
							// onClick={() => navigate(`detail/${item.post_id}`)}
						/>
					))}
				</div>
			</div>

			<ButtonArea />
			<PreviewBottomSheet />
		</div>
	)
}

export default FollowingTab
