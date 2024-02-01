import { IAddBucket, IBucket, IBucketPosition } from "../types/bucket"
import { getCircleEdgePos } from "./common"

export function addBucket1st({ pos, user, setBuckets1st }: IAddBucket) {
	setBuckets1st!((prevBuckets: IBucket[]) => {
		
    // 초과 방지
		if (prevBuckets.length >= 3 ) return prevBuckets

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


export const bucket1stPositioning = ({ setBuckets1st, user, radius, maxNum }: IBucketPosition) => {
	let prevBuckets: IBucket[] = []
	setBuckets1st!((prev) => {
		prevBuckets = prev
		return prev
	})

	if (prevBuckets.length >= 3) return
	// const radius = 16.5 // 16.5 | 34.5 | 50
	const pos = getCircleEdgePos(radius)
	if (prevBuckets.length === 0) {
		return addBucket1st({ pos, user, setBuckets1st })
	} else {
		const isInRange = prevBuckets.some((user) => {
			const interDistance = Math.sqrt(
				(pos.x - user.pos.x) * (pos.x - user.pos.x) + (pos.y - user.pos.y) * (pos.y - user.pos.y)
			)

			// 거리가 13 미만이면
			return interDistance < 14
		})
		if (!isInRange) {
			return addBucket1st({ pos, user, setBuckets1st })
		} else {
			// console.log("recursive");
			// 겹치면 다른 값으로 재귀 호출
			bucket1stPositioning({ setBuckets1st, user, radius, maxNum })
		}
	}
}