import { ReactNode } from 'react'
import './Ggumtle.css'
import { bgColorClass } from '../constants/dynamicClass'

const DEFAULT_COLOR = 'green'
const DEFAULT_WIDTH = 14
const DEFAULT_HEIGHT = 14
// const DEFAULT_WIDTH = '4vh'
// const DEFAULT_HEIGHT = '4vh'
const DEFAULT_SPEED = 10

// screen-reader 설명을 위한 explanation props 추가
// 검색 아이콘을 위한 children props 추가
interface IGgumtleProps {
	ggumtleRef?: React.RefObject<HTMLDivElement>
	color: string
	width: number
	height: number
	speed?: number
	explanation?: string
	children?: ReactNode
}

const Ggumtle = ({
	ggumtleRef,
	color = DEFAULT_COLOR,
	width = DEFAULT_WIDTH,
	height = DEFAULT_HEIGHT,
	speed = DEFAULT_SPEED,
	explanation,
	children,
}: IGgumtleProps) => {
	console.log('ggumtle is rendered!')
	const getGgumtleSize = (width: number, height: number) => {
		return { width: `${width}px`, height: `${height}px` }
	}
	const getGgumtleAnimation = (speed: number) => {
		return { animation: `ggumtleMove ${speed}s ease-in-out infinite both alternate` }
	}
	const ggumtleInlineStyle = Object.assign(
		getGgumtleSize(width, height),
		getGgumtleAnimation(speed)
	)

	return (
		<div ref={ggumtleRef} style={ggumtleInlineStyle} className={`ggumtle ${bgColorClass[color]}`}>
			{explanation && <p className="sr-only">{explanation}</p>}
			{children}
		</div>
	)
}

export default Ggumtle
