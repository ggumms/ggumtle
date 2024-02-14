import React, { useState, useEffect } from 'react'

interface Point {
	x: number
	y: number
}

const getRandomPosition = (): Point => {
	return {
		x: Math.random() * 100, // 예시로 0에서 100 사이의 무작위 x 좌표
		y: Math.random() * 100, // 예시로 0에서 100 사이의 무작위 y 좌표
	}
}

const checkCollision = (point: Point, list: Point[]): boolean => {
	// 현재 추가하려는 포인트와 기존 리스트의 각 포인트 간의 거리를 계산하여 충돌을 확인
	for (const existingPoint of list) {
		const distance = Math.sqrt((point.x - existingPoint.x) ** 2 + (point.y - existingPoint.y) ** 2)
		if (distance < 10) {
			// 예시로 거리가 10 미만이면 충돌로 간주
			return true
		}
	}
	return false
}

const Test = () => {
	const [list, setList] = useState<Point[]>([])

	useEffect(() => {
		const intervalId = setInterval(() => {
			let newPoint = getRandomPosition()
			// 새로운 포인트가 기존 리스트와 충돌하지 않을 때까지 계속해서 새로운 포인트 생성
			while (checkCollision(newPoint, list)) {
				newPoint = getRandomPosition()
			}
			setList([...list, newPoint])
		}, 1000) // 1초마다 포인트를 추가하도록 설정

		return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌을 정리하여 메모리 누수 방지
	}, [list])

	return (
		<div>
			<ul>
				{list.map((point, index) => (
					<li key={index}>
						Point {index + 1}: ({point.x}, {point.y})
					</li>
				))}
			</ul>
		</div>
	)
}

export default Test
