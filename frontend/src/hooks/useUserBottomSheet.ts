
import { useRef, useEffect, useState } from 'react'

export const MIN_Y = -50 // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 100 // 바텀시트가 최소로 내려갔을 때의 y 값
// export const PREVIEW_HEIGHT = window.innerHeight/100 * 30 // 바텀시트의 세로 길이
export const PREVIEW_HEIGHT = 500 // 바텀시트의 세로 길이
export const MAX_BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y // 바텀시트의 세로 길이

type BottomSheetStateType = 'close' | 'preview' | 'maxup'

interface BottomSheetMetrics {
	sheetState: BottomSheetStateType
	touchStart: {
		sheetY: number
		touchY: number
	}
	touchMove: {
		prevTouchY?: number
		movingDirection: 'none' | 'down' | 'up'
	}
	isContentAreaTouched: boolean
}

export default function useUserBottomSheet() {
	const sheet = useRef<HTMLDivElement>(null)
	const content = useRef<HTMLDivElement>(null)
	const [toggle, setToggle] = useState(false)
	const [isMaxup, setIsMaxup] = useState<boolean>(false)

	const metrics = useRef<BottomSheetMetrics>({
		sheetState: 'close',
		touchStart: {
			sheetY: 0,
			touchY: 0,
		},
		touchMove: {
			prevTouchY: 0,
			movingDirection: 'none',
		},
		isContentAreaTouched: false,
	})

	const openPreview = () => {
		if (sheet.current) {
			sheet.current!.style.setProperty('transform', `translateY(${PREVIEW_HEIGHT - MAX_Y}px)`)
			setToggle(true)
		}
	}

	// const closePreview = () => {
	// 	if (sheet.current) {
	// 		sheet.current!.style.setProperty('transform', `translateY(0px)`)
	// 		setToggle(false)
	// 		setIsMaxup(false)
	// 	}
	// }

	const togglePreview = () => {
		setToggle(!toggle)
	}

	useEffect(() => {
		if (sheet.current) {
			if (toggle) {
				sheet.current!.style.setProperty('transform', `translateY(${PREVIEW_HEIGHT - MAX_Y}px)`)
			} else {
				sheet.current!.style.setProperty('transform', 'translateY(0)')
			}
		}
		setIsMaxup(false)
	}, [toggle])

	useEffect(() => {
		const canUserMoveBottomSheet = () => {
			const { touchMove, isContentAreaTouched } = metrics.current

			if (!isContentAreaTouched) {
				return true
			}

			if (sheet.current && sheet.current!.getBoundingClientRect().y < 0) {
				return true
			}

			if (touchMove.movingDirection === 'down') {
				return content.current!.scrollTop <= 0
			}

			return false
		}

		const handleTouchStart = (e: TouchEvent) => {
			const { touchStart } = metrics.current
			touchStart.sheetY = sheet.current!.getBoundingClientRect().y
			touchStart.touchY = e.touches[0].clientY
		}

		const handleTouchMove = (e: TouchEvent) => {
			const { touchStart, touchMove } = metrics.current
			const currentTouch = e.touches[0]

			if (touchMove.prevTouchY === undefined) {
				touchMove.prevTouchY = touchStart.touchY
			}

			if (touchMove.prevTouchY === 0) {
				touchMove.prevTouchY = touchStart.touchY
			}

			if (touchMove.prevTouchY < currentTouch.clientY) {
				touchMove.movingDirection = 'down'
			}

			if (touchMove.prevTouchY > currentTouch.clientY) {
				touchMove.movingDirection = 'up'
			}

			if (canUserMoveBottomSheet()) {
				e.preventDefault()

				const touchOffset = currentTouch.clientY - touchStart.touchY
				let nextSheetY = touchStart.sheetY + touchOffset

				if (nextSheetY <= MIN_Y) {
					nextSheetY = 0
				}

				if (nextSheetY >= MAX_Y) {
					nextSheetY = MAX_Y
				}

				sheet.current!.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`)
			}
			if (!canUserMoveBottomSheet()) {
				document.body.style.overflowY = 'hidden'
			}
		}

		const handleTouchEnd = () => {
			document.body.style.overflowY = 'auto'
			const { touchMove } = metrics.current

			// Snap Animation
			const currentSheetY = sheet.current!.getBoundingClientRect().y

			if (sheet.current) {
				if (currentSheetY !== MIN_Y) {
					// sheetState: preveiw 상태
					if (metrics.current.touchStart.sheetY === 550) {
						if (touchMove.movingDirection === 'down') {
							sheet.current!.style.setProperty('transform', 'translateY(0)')
							metrics.current.sheetState = 'close'

							setIsMaxup(false)
							setToggle(false)
						}

						if (touchMove.movingDirection === 'up') {
							sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
							metrics.current.sheetState = 'maxup'

							setIsMaxup(true)
						}
					}
					// sheetState: close 상태
					if (metrics.current.touchStart.sheetY > 600) {
						// 1단 (초기 상태)
						if (touchMove.movingDirection === 'down') {
							sheet.current!.style.setProperty('transform', 'translateY(20)')
							setToggle(false)
						}
						
						if (touchMove.movingDirection === 'up') {
							sheet.current!.style.setProperty('transform', `translateY(${PREVIEW_HEIGHT - MAX_Y}px)`)
							metrics.current.sheetState = 'preview'
							setToggle(true)
							setIsMaxup(false)
						}
					}
					// sheetState: maxup 상태
					if (metrics.current.touchStart.sheetY === 0) {
						// 1단 (초기 상태)
						if (touchMove.movingDirection === 'down') {
							sheet.current!.style.setProperty('transform', `translateY(${PREVIEW_HEIGHT - MAX_Y}px)`)
							metrics.current.sheetState = 'preview'

							setIsMaxup(false)
							setToggle(true)
						}

						if (touchMove.movingDirection === 'up') {
							sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
							setIsMaxup(true)
						}
					}
				}
			}

			// metrics 초기화.
			metrics.current = {
				sheetState: 'close',
				touchStart: {
					sheetY: 0,
					touchY: 0,
				},
				touchMove: {
					prevTouchY: 0,
					movingDirection: 'none',
				},
				isContentAreaTouched: false,
			}
		}

		// @TODO: 마우스 이벤트 리스너 추가하기
		if (sheet.current) {
			sheet.current.addEventListener('touchstart', handleTouchStart)
			sheet.current.addEventListener('touchmove', handleTouchMove)
			sheet.current.addEventListener('touchend', handleTouchEnd)
		}
	}, [isMaxup])

	// content 영역을 터치하는 것을 기록합니다.
	useEffect(() => {
		const handleTouchStart = () => {
			metrics.current.isContentAreaTouched = true
		}
		
		if (content.current) {
			content.current.addEventListener('touchstart', handleTouchStart)
		}

		return () =>
			content.current
				? content.current.removeEventListener('touchstart', handleTouchStart)
				: undefined
	})
	// useEffect(() => {
	// 	const handleTouchStart = () => {
	// 		metrics.current!.isContentAreaTouched = true
	// 	}
	// 	content.current!.addEventListener('touchstart', handleTouchStart)
	// }, [])

	return { sheet, content, openPreview, togglePreview, isMaxup }
}
