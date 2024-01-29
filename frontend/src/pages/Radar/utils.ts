import { IAddBucket, IBucket, IBucketPosition } from './Interfaces'

export function getCircleEdgePos(radius: number) {
	const angle = Math.random() * 2 * Math.PI
	const x = radius * Math.cos(angle)
	const y = radius * Math.sin(angle)

	//보이는 레이더 위치에 들어오게 조정
	if (Math.abs(x) <= 40 && y >= -40) return { x, y }

	// distance 값을 조정하여 재귀 호출
	// const adjustedDistance = distance - 1 // 임의의 값으로 조정 (조건에 맞게 조정해야 함)
	return getCircleEdgePos(radius)
}

export function addBucket({ pos, user, setBuckets }: IAddBucket) {
	setBuckets((prevBuckets: IBucket[]) => {
		// 초과 방지
		if (prevBuckets.length > 6) return prevBuckets

		// 이미 존재하는 user인지 확인
		const isUserExist = prevBuckets.some((bucket) => bucket.user === user)

		// 존재하지 않으면 추가
		if (!isUserExist) {
			return [
				...prevBuckets,
				{
					pos: pos,
					user: user,
				},
			]
		}

		// 존재하면 이전 상태 그대로 반환
		return prevBuckets
	})
}

export const bucketPositioning = ({ setBuckets, user, radius, maxNum }: IBucketPosition) => {
	let prevBuckets: IBucket[] = []
	setBuckets((prev) => {
		prevBuckets = prev
		return prev
	})

	if (prevBuckets.length >= 25) return
	// const radius = 16.5 // 16.5 | 34.5 | 50
	const pos = getCircleEdgePos(radius)
	if (prevBuckets.length === 0) {
		return addBucket({ pos, user, setBuckets })
	} else {
		const isInRange = prevBuckets.some((user) => {
			const interDistance = Math.sqrt(
				(pos.x - user.pos.x) * (pos.x - user.pos.x) + (pos.y - user.pos.y) * (pos.y - user.pos.y)
			)

			// 거리가 13 미만이면
			return interDistance < 13
		})
		if (!isInRange) {
			return addBucket({ pos, user, setBuckets })
		} else {
			// console.log("recursive");
			// 겹치면 다른 값으로 재귀 호출
			bucketPositioning({ setBuckets, user, radius, maxNum })
		}
	}
}
