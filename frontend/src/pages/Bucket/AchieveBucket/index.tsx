import { TouchEvent, useEffect, useRef, useState } from 'react'
import Ggumtle from '../../../components/Ggumtle'

const MAX_SPEED = 0.5

// Todo : url을 통해서 현재 버킷 정보를 확인하고 해당 버킷이 사용자의 버킷인지 확인 필요 -> 사용자의 버킷이 아니라면 메인 페이지로 인동
const AchieveBucket = () => {
	const [isPressing, setIsPressing] = useState(false)
	const ggumtleRef = useRef<HTMLDivElement>(null)
	const gaugeRef = useRef(0) // useRef를 사용하여 gauge 값을 추적
	const animationRef = useRef<Animation>() // useRef를 사용하여 gauge 값을 추적

	const achieveButtonRef = useRef<HTMLButtonElement>(null)

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
				const playbackRate = gauge === 0 ? 0.05 : gauge * 0.01 // 기본 속도에 대한 새 속도의 비율 계산
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
						{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }, // 마지막에 다시 초기 상태로 돌아가게 설정
					],
					{
						duration: 1000 * MAX_SPEED, // 1초 동안
						easing: 'ease-in-out',
						iterations: Infinity, // 무한 반복
						direction: 'alternate', // 방향 전환
					}
				)
				animationRef.current.updatePlaybackRate(0.08)
			}
		}
	}

	const handleStartToPress = () => {
		setIsPressing(true)
	}
	const handleEndToPress = () => {
		setIsPressing(false)
	}
	// touch event엔 onMouseLeave와 같은 이벤트가 없어서 직접 구현
	const handleCheckPressIsInButton = (event: TouchEvent<HTMLButtonElement>) => {
		if (!achieveButtonRef.current) {
			return
		}

		const touch = event.touches[0]
		const { left, top, right, bottom } = achieveButtonRef.current.getBoundingClientRect()

		if (
			touch.clientX < left ||
			touch.clientX > right ||
			touch.clientY < top ||
			touch.clientY > bottom
		) {
			setIsPressing(false)
		}
	}

	return (
		<div>
			<Ggumtle ggumtleRef={ggumtleRef} width={200} height={200} color="lightGreen" />
			<button
				ref={achieveButtonRef}
				onMouseDown={handleStartToPress}
				onMouseUp={handleEndToPress}
				onMouseLeave={handleEndToPress}
				onTouchStart={handleStartToPress}
				onTouchEnd={handleEndToPress}
				onTouchMove={handleCheckPressIsInButton}
				className={`w-full text-white text-lg font-bold py-4 rounded-[5px] bg-point1`}
			>
				달성하기
			</button>
		</div>
	)
}

export default AchieveBucket
