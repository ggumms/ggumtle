import { IRadarBucket } from '../../AllTab'
import { IAddBucket, IBucketPosition } from '../../types/radarBucket'
import { getThirdCircleEdgePos } from '../common'

export function addBucket3rd({ pos, bucket, setBuckets3rd }: IAddBucket) {
	setBuckets3rd!((prevBuckets: IRadarBucket[]) => {
		// 초과 방지
		if (prevBuckets.length >= 9) return prevBuckets

		// 이미 존재하는 bucket인지 확인
		const isBucketExist = prevBuckets.some((e) => e.bucketId === bucket.bucketId)

		// 존재하지 않으면 추가
		if (!isBucketExist) {
			return [
				...prevBuckets,
				{
					pos: pos,
					bucketId: bucket.bucketId,
					title: bucket.title,
					bucketPicture: bucket.bucketPicture,
					color: bucket.color,
				},
			]
		}

		// 존재하면 이전 상태 그대로 반환
		return prevBuckets
	})
}

export const bucket3rdPositioning = ({
	setBuckets3rd,
	bucket,
	radius,
	maxNum,
}: IBucketPosition) => {
	let prevBuckets: IRadarBucket[] = []
	setBuckets3rd!((prev) => {
		prevBuckets = prev
		return prev
	})

	if (prevBuckets.length >= 9) return
	// const radius = 16.5 // 16.5 | 34.5 | 50
	const pos = getThirdCircleEdgePos(radius)
	if (prevBuckets.length === 0) {
		return addBucket3rd({ pos, bucket, setBuckets3rd })
	} else {
		// @TODO: 간혹 겹치는 요소 발생 오류 해결하기
		const isInRange = prevBuckets.some((bucket) => {
			const interDistance = Math.sqrt(
				(pos.x - bucket.pos.x) * (pos.x - bucket.pos.x) +
					(pos.y - bucket.pos.y) * (pos.y - bucket.pos.y)
			)

			// 거리가 13 미만이면
			return interDistance > 17
		})
		if (isInRange) {
			return addBucket3rd({ pos, bucket, setBuckets3rd })
		} else {
			// 겹치면 다른 값으로 재귀 호출
			bucket3rdPositioning({ setBuckets3rd, bucket, radius, maxNum })
		}
	}
}
