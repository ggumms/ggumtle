import { useParams } from 'react-router'
import { useRouter } from '../../../../hooks/useRouter'
import { TouchEvent, useRef } from 'react'

interface IachievementButtonProps {
	setIsPressing: React.Dispatch<React.SetStateAction<boolean>>
	gaugeRef: React.RefObject<number>
}
const AchievementButton = ({ gaugeRef, setIsPressing }: IachievementButtonProps) => {
	const { routeTo } = useRouter()
	const { bucketId } = useParams()
	const triggerButtonRef = useRef<HTMLButtonElement>(null)

	const handleStartToPress = () => {
		setIsPressing(true)
	}
	const handleEndToPress = () => {
		setIsPressing(false)
	}
	// touch event엔 onMouseLeave와 같은 이벤트가 없어서 직접 구현
	const handleCheckPressIsInButton = (event: TouchEvent<HTMLButtonElement>) => {
		if (!triggerButtonRef.current) {
			return
		}

		const touch = event.touches[0]
		const { left, top, right, bottom } = triggerButtonRef.current.getBoundingClientRect()

		if (
			touch.clientX < left ||
			touch.clientX > right ||
			touch.clientY < top ||
			touch.clientY > bottom
		) {
			setIsPressing(false)
		}
	}

	const handleClickAchievement = () => {
		routeTo(`/bucket/congratulation/${bucketId}`)
	}

	return (
		<>
			<button
				ref={triggerButtonRef}
				onMouseDown={handleStartToPress}
				onMouseUp={handleEndToPress}
				onMouseLeave={handleEndToPress}
				onTouchStart={handleStartToPress}
				onTouchEnd={handleEndToPress}
				onTouchMove={handleCheckPressIsInButton}
				className={`w-full text-white text-lg font-bold py-4 rounded-[5px] bg-point1 border-2`}
			>
				달성하기
			</button>
			<button onClick={handleClickAchievement}>달성하기</button>
		</>
	)
}

export default AchievementButton
