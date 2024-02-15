import { useParams } from 'react-router'
import { useRouter } from '../../../../hooks/useRouter'
import { TouchEvent, useEffect, useState } from 'react'
import './AchievementButton.css'
import { patchAchieve } from '../api'

interface IAchievementButtonProps {
	setIsPressing: React.Dispatch<React.SetStateAction<boolean>>
	setHasConfetti: React.Dispatch<React.SetStateAction<boolean>>
	gaugeRef: React.RefObject<number>
	AchieveButtonRef: React.RefObject<HTMLButtonElement>
}
const AchievementButton = ({
	gaugeRef,
	AchieveButtonRef,
	setIsPressing,
	setHasConfetti,
}: IAchievementButtonProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const { routeTo } = useRouter()
	const { bucketId } = useParams()

	useEffect(() => {
		console.log(isLoading)
	}, [isLoading])

	const handleStartToClick = () => {
		setIsPressing(true)
	}
	const handleEndToClick = () => {
		if (gaugeRef.current === 100) {
			setIsLoading(false)
		}
		setIsPressing(false)
	}

	const handleStartToPress = () => {
		setIsPressing(true)
	}
	const handleEndToPress = () => {
		if (gaugeRef.current === 100) {
			setIsLoading(false)
		}
		setIsPressing(false)
	}
	// touch event엔 onMouseLeave와 같은 이벤트가 없어서 직접 구현
	const handleCheckPressIsInButton = (event: TouchEvent<HTMLButtonElement>) => {
		if (!AchieveButtonRef.current) {
			return
		}

		const touch = event.touches[0]
		const { left, top, right, bottom } = AchieveButtonRef.current.getBoundingClientRect()

		if (
			touch.clientX < left ||
			touch.clientX > right ||
			touch.clientY < top ||
			touch.clientY > bottom
		) {
			setIsPressing(false)
		}
	}

	const handleClickAchievement = async () => {
		console.log('bucketId', bucketId)
		if (bucketId) {
			const achieveRes = await patchAchieve(bucketId)
			if (achieveRes === 'success') {
				setHasConfetti(true)
				setTimeout(() => {
					routeTo(`/bucket/congratulation/${bucketId}`)
				}, 3000)
			}
		}
	}

	return (
		<>
			<button
				ref={AchieveButtonRef}
				onMouseDown={handleStartToClick}
				onMouseUp={isLoading ? handleEndToClick : handleClickAchievement}
				onMouseLeave={isLoading ? handleEndToClick : handleClickAchievement}
				onTouchStart={handleStartToPress}
				onTouchEnd={isLoading ? handleEndToPress : handleClickAchievement}
				onTouchMove={handleCheckPressIsInButton}
				className={`confetti-button  w-full text-white text-xl font-bold py-4 rounded-[5px] bg-point1 border-2 border-point1`}
			>
				달성하기
			</button>
		</>
	)
}

export default AchievementButton
