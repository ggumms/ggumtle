import { useRef, useEffect, useState } from 'react'

export const MIN_Y = -50 // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 100 // 바텀시트가 최소로 내려갔을 때의 y 값
// export const PREVIEW_HEIGHT = window.innerHeight/100 * 30 // 바텀시트의 세로 길이
export const PREVIEW_HEIGHT = window.innerHeight - 500 // 바텀시트의 세로 길이
export const MAX_BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y // 바텀시트의 세로 길이

interface BottomSheetMetrics {
	sheetState: 'close' | 'preview' | 'maxup'
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

// type BottomSheetStateType =

export default function useBottomSheet() {
	const sheet = useRef<HTMLDivElement>(null)
	const content = useRef<HTMLDivElement>(null)
	const [toggle, setToggle] = useState(false)
	// const [sheetState, setSheetState] = useState<BottomSheetStateType>('close')

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
		console.log('run open Preview', PREVIEW_HEIGHT)
		if (sheet.current) {
			console.log('True')
			// 현재 위치에 따라 이동시키기
			// sheet.current.style.setProperty('transform', 'translateY(500px)')
			setToggle(true)
		}
	}

	const closePreview = () => {
		console.log('closeToggle', toggle)
		if (sheet.current) {
			sheet.current.style.setProperty('transform', 'translateY(0)')
			setToggle(false)
		}
	}

	const togglePreview = () => {
		setToggle(!toggle)
	}

	useEffect(() => {
		// if (sheet.current) {
		// 	if (toggle) {
		// 		sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
		// 	} else {
		// 		sheet.current!.style.setProperty('transform', 'translateY(0)')
		// 	}
		// }
	}, [toggle])

	useEffect(() => {
		const canUserMoveBottomSheet = () => {
			const { touchMove, isContentAreaTouched } = metrics.current

			if (!isContentAreaTouched) {
				return true
			}

			if (sheet.current && sheet.current!.getBoundingClientRect().y !== MIN_Y) {
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
			} else {
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
					console.log('현재 바텀시트 위치는 ', metrics.current.touchStart.sheetY)
					if (metrics.current.touchStart.sheetY === 550) { // preveiw 상태
					// if (metrics.current.touchStart.sheetY ) {
						// 2단 (1단은 이미 열린 상태)
						if (touchMove.movingDirection === 'down') {
							sheet.current!.style.setProperty('transform', 'translateY(0)')
							metrics.current.sheetState = 'close'
							console.log('end - preview - down', metrics.current.sheetState)
						}

						if (touchMove.movingDirection === 'up') {
							sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
							metrics.current.sheetState = 'maxup'
							console.log('end - preview - up', metrics.current.sheetState)
						}
					}
					if (metrics.current.touchStart.sheetY > 600) { // close 상태
						// 1단 (초기 상태)
						if (touchMove.movingDirection === 'down') {
							sheet.current!.style.setProperty('transform', 'translateY(20)')
							metrics.current.sheetState = 'close'
							console.log('end - close - down', metrics.current.sheetState)
						}

						if (touchMove.movingDirection === 'up') {
							sheet.current!.style.setProperty('transform', `translateY(${500 - MAX_Y}px)`)
							metrics.current.sheetState = 'preview'
							console.log('end - close - up', metrics.current.sheetState)
						}
					}
					if (metrics.current.touchStart.sheetY === 0) { // maxup 상태
						// 1단 (초기 상태)
						if (touchMove.movingDirection === 'down') {
							sheet.current!.style.setProperty('transform', `translateY(${500 - MAX_Y}px)`)
							metrics.current.sheetState = 'close'
							console.log('maxup to down', metrics.current.sheetState)
						}

						if (touchMove.movingDirection === 'up') {
							sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
							metrics.current.sheetState = 'preview'
							console.log('maxup to up', metrics.current.sheetState)
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
	}, [])

	// useEffect(() => {
	// 	const handleTouchStart = () => {
	// 		metrics.current!.isContentAreaTouched = true
	// 	}
	// 	content.current!.addEventListener('touchstart', handleTouchStart)
	// }, [])

	return { sheet, content, openPreview, closePreview, togglePreview }
}
