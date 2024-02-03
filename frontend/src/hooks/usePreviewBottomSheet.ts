import { useRef, useEffect, useState } from 'react'
import { MAX_Y, MIN_Y } from '../pages/Radar/components/preview/PreviewBottomSheet'

interface BottomSheetMetrics {
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

export default function useBottomSheet() {
	const sheet = useRef<HTMLDivElement>(null)
	const content = useRef<HTMLDivElement>(null)
	const [toggle, setToggle] = useState(false)

	const metrics = useRef<BottomSheetMetrics>({
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
		console.log("run open Preview")
		if (sheet.current) {
			console.log("True")
			sheet.current.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
			setToggle(true)
		}
	}

	const closePreview = () => {
		if (sheet.current) {
			sheet.current.style.setProperty('transform', 'translateY(0)')
			setToggle(false)
		}
	}

	const togglePreview = () => {
		setToggle(!toggle)
	}

	useEffect(() => {
		if (sheet.current) {
			if (toggle) {
				sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
			} else {
				sheet.current!.style.setProperty('transform', 'translateY(0)')
			}
		}
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
				// 맨 처음 앱 시작하고 시작시
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
					nextSheetY = MIN_Y
				}

				if (nextSheetY >= MAX_Y) {
					nextSheetY = MAX_Y
				}

				sheet.current!.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`) //바닥 만큼은 빼야쥬...
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
					if (touchMove.movingDirection === 'down') {
						sheet.current!.style.setProperty('transform', 'translateY(0)')
						setToggle(false)
					}

					if (touchMove.movingDirection === 'up') {
						sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`)
						setToggle(true)
						console.log(toggle)
					}
				}
			}

			// metrics 초기화.
			metrics.current = {
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
