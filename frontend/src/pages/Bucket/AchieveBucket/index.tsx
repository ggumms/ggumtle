import { useEffect, useRef, useState } from 'react'
import Ggumtle from '../../../components/Ggumtle'
import AchievementButton from './component/AchievementButton'

// const ROTATING_TEXT = [
// 	'꿈을 꿨던 처음은 어떠셨나요?',
// 	'가장 기억에 남는 순간은 언제인가요?',
// 	'포기하고 싶은 순간이 있었나요?',
// 	'어떤 변화를 느끼셨나요?',
// 	'함께한 사람들이 있으셨나요?',
// 	'꿈을 이루면서 생각나는 사람이 있으셨나요?',
// ]

// Todo : url을 통해서 현재 버킷 정보를 확인하고 해당 버킷이 사용자의 버킷인지 확인 필요 -> 사용자의 버킷이 아니라면 메인 페이지로 인동
// Todo : 축하 페이지와 달성 페이지 나누지 말고 애니메이션 이용해서 한 페이지에서 관리하기
const AchieveBucket = () => {
	const [isPressing, setIsPressing] = useState(false)

	const ggumtleRef = useRef<HTMLDivElement>(null)
	const gaugeRef = useRef(0) // useRef를 사용하여 gauge 값을 추적
	const animationRef = useRef<Animation>() // useRef를 사용하여 Animation 객체를 추적

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null
		if (isPressing) {
			interval = setInterval(() => {
				gaugeRef.current = gaugeRef.current < 100 ? gaugeRef.current + 1 : 100
				changeGgumtleSpeed(gaugeRef.current)
				console.log(gaugeRef.current)
			}, 100) // 0.1초 마다 게이지 1씩 증가
		} else {
			interval && clearInterval(interval)
			gaugeRef.current = 0
			changeGgumtleSpeed(gaugeRef.current)
		}

		// 컴포넌트 언마운트 시 인터벌 정리
		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isPressing])

	const changeGgumtleSpeed = (gauge: number) => {
		if (ggumtleRef.current) {
			if (animationRef.current) {
				const playbackRate = gauge === 0 ? 0.1 : gauge * 0.01 // 기본 속도에 대한 새 속도의 비율 계산
				animationRef.current.updatePlaybackRate(playbackRate)
			} else {
				animationRef.current = ggumtleRef.current.animate(
					[
						{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' },
						{ borderRadius: '40% 60% 54% 46% / 49% 60% 40% 51%' },
						{ borderRadius: '54% 46% 38% 62% / 49% 70% 30% 51%' },
						{ borderRadius: '61% 39% 55% 45% / 61% 38% 62% 39%' },
						{ borderRadius: '61% 39% 67% 33% / 70% 50% 50% 30%' },
						{ borderRadius: '50% 50% 34% 66% / 56% 68% 32% 44%' },
						{ borderRadius: '46% 54% 50% 50% / 35% 61% 39% 65%' },
					],
					{
						duration: 500, // 1초 동안
						easing: 'ease-in-out',
						iterations: Infinity, // 무한 반복
						direction: 'alternate', // 방향 전환
					}
				)
				// animationRef.current.updatePlaybackRate(0.8)
			}
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-20 px-20">
			<Ggumtle ggumtleRef={ggumtleRef} width={200} height={200} color="lightGreen" />
			<AchievementButton gaugeRef={gaugeRef} setIsPressing={setIsPressing} />
		</div>
	)
}

export default AchieveBucket
