export const getCircleEdgePos = (radius: number) => {
	const angle = Math.random() * 2 * Math.PI
	const x = radius * Math.cos(angle)
	const y = radius * Math.sin(angle)

	//보이는 레이더 위치에 들어오게 조정
	if (Math.abs(x) <= 40) return { x, y }

	// distance 값을 조정하여 재귀 호출
	// const adjustedDistance = distance - 1 // 임의의 값으로 조정 (조건에 맞게 조정해야 함)
	return getCircleEdgePos(radius)
}
