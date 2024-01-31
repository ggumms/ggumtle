import { useEffect, useState } from 'react'
import { bucketPositioning } from '../utils'
import UserItem from './UserItem'
import { IBucket } from '../types/bucket'
import PreviewUser from './preview/PreviewUser'
// 더미 데이터
const users1 = ['a', 'b', 'c', 'd', 'e', 'f']
const users2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const users3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'o', 'p', 'q']

// 버킷들을 띄울 div 스타일 지정

// @TODO: 추후 tailwind 코드로 수정하기 (translate 속성 유의)
const bucketArea: {
	position: 'absolute'
	top: string
	left: string
	transform: string
	width: string
	aspectRatio: string
} = {
	position: 'absolute',
	top: 'calc(50% - 20px)',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '110%',
	aspectRatio: '1 / 1',
}

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
				<div className="w-[110%] mt-10 animate-radar3 border border-[#c6c6c661] aspect-square rounded-full flex absolute items-center justify-center">
					<div className="w-2/3 animate-radar2 border border-[#c6c6c661] aspect-square rounded-full flex absolute items-center justify-center">
						<div className="w-1/2 animate-radar1 border border-[#c6c6c661] aspect-square rounded-full flex absolute items-center justify-center"></div>
					</div>
				</div>

				<div className="mt-10" style={bucketArea}>
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
			<div className='absolute bottom-0 z-20 w-full'>
				<PreviewUser />
			</div>
		</div>
	)
}

export default FollowingTab
