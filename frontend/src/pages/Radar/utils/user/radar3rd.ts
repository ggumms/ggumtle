import { IAddUser, IRadarUser, IUserPosition } from '../../types/radarUser'
import { getThirdCircleEdgePos } from '../common'

export function addUser3rd({ pos, user, setUsers3rd }: IAddUser) {
	setUsers3rd!((prevUsers: IRadarUser[]) => {
		// 초과 방지
		if (prevUsers.length >= 9) return prevUsers

		// 이미 존재하는 user인지 확인
		const isUserExist = prevUsers.some((e) => e.userId === user.userId)

		// 존재하지 않으면 추가
		if (!isUserExist) {
			return [
				...prevUsers,
				{
					pos: pos,
					userId: user.userId,
					userNickname: user.userNickname,
					userProfileImage: user.userProfileImage,
				},
			]
		}

		// 존재하면 이전 상태 그대로 반환
		return prevUsers
	})
}

export const user3rdPositioning = ({ setUsers3rd, user, radius, maxNum }: IUserPosition) => {
	let prevUsers: IRadarUser[] = []
	setUsers3rd!((prev) => {
		prevUsers = prev
		return prev
	})

	if (prevUsers.length >= 9) return
	// const radius = 16.5 // 16.5 | 34.5 | 50
	const pos = getThirdCircleEdgePos(radius)
	if (prevUsers.length === 0) {
		return addUser3rd({ pos, user, setUsers3rd })
	} else {
		const isInRange = prevUsers.some((user) => {
			const interDistance = Math.sqrt(
				(pos.x - user.pos.x) * (pos.x - user.pos.x) + (pos.y - user.pos.y) * (pos.y - user.pos.y)
			)

			// 거리가 13 미만이면
			return interDistance < 13
		})
		if (!isInRange) {
			return addUser3rd({ pos, user, setUsers3rd })
		} else {
			// console.log("recursive");
			// 겹치면 다른 값으로 재귀 호출
			user3rdPositioning({ setUsers3rd, user, radius, maxNum })
		}
	}
}
