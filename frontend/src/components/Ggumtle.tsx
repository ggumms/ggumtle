import React, { ReactNode } from 'react'
import './Ggumtle.css'
import { bgColorClass } from '../constants/dynamicClass'

const DEFAULT_COLOR = 'green'
const DEFAULT_WIDTH = '4vh'
const DEFAULT_HEIGHT = '4vh'
const DEFAULT_SPEED = 10

// screen-reader 설명을 위한 explanation props 추가
// 검색 아이콘을 위한 children props 추가
interface IGgumtleProps {
	color: string
	width: string
	height: string
	speed: number
	explanation?: string
	children?: ReactNode
}

const Ggumtle = ({
	color = DEFAULT_COLOR,
	width = DEFAULT_WIDTH,
	height = DEFAULT_HEIGHT,
	speed = DEFAULT_SPEED,
	explanation,
	children,
}: IGgumtleProps) => {
	const getGgumtleSize = (width: string, height: string) => {
		return { width, height }
	}
	const getGgumtleAnimation = (speed: number) => {
		return { animation: `transform ${speed}s ease-in-out infinite both alternate` }
	}
	const ggumtleInlineStyle = Object.assign(
		getGgumtleSize(width, height),
		getGgumtleAnimation(speed)
	)

	return (
		<div style={ggumtleInlineStyle} className={`ggumtle w-[4vh] h-[4vh] ${bgColorClass[color]}`}>
			{explanation && <p className="sr-only">{explanation}</p>}
			{children}
		</div>
	)
}

export default Ggumtle
