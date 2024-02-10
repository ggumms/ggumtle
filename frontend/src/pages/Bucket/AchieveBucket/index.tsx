import { TouchEvent, useEffect, useRef, useState } from 'react'
import Ggumtle from '../../../components/Ggumtle'

// Todo : url을 통해서 현재 버킷 정보를 확인하고 해당 버킷이 사용자의 버킷인지 확인 필요 -> 사용자의 버킷이 아니라면 메인 페이지로 인동
// 1. 현재 bucketId가 유효한 bucketId 인지 확인 + id로 버킷 정보 조회해서 owner가 맞는지 확인 -> 아니면 메인 페이지로 이동 (hooks로 만들어서 상세페이지 수정, 후기 페이지 수정 + 작성에 사용하기)
// 2. 버튼 누르고 있을 경우에만 숫자가 올라가고 때면 다시 0으로 돌아가도록 설정
const AchieveBucket = () => {
	const [isPressing, setIsPressing] = useState(false)
	const [gauge, setGauge] = useState(0)
	const achieveButtonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null
		if (isPressing) {
			interval = setInterval(() => {
				setGauge((prev) => (prev < 100 ? prev + 1 : 100))
			}, 100) // 0.1초 마다 게이지 1씩 증가
		} else {
			interval && clearInterval(interval)
			setGauge(0)
		}

		// 컴포넌트 언마운트 시 인터벌 정리
		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isPressing])

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
			<Ggumtle width={200} height={200} speed={8} color="lightGreen" />
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
				{gauge}
			</button>
		</div>
	)
}

export default AchieveBucket
