import { IAddUser, IRadarUser, IUserPosition } from '../../types/radarUser'
import { getCircleEdgePos } from '../common'

export function addUser1st({ pos, user, setUsers1st }: IAddUser) {
	setUsers1st!((prevUsers: IRadarUser[]) => {
		// 초과 방지
		if (prevUsers.length >= 3) return prevUsers

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

export const user1stPositioning = ({ setUsers1st, user, radius, maxNum }: IUserPosition) => {
	let prevUsers: IRadarUser[] = []
	setUsers1st!((prev) => {
		prevUsers = prev
		return prev
	})
	
	console.log(prevUsers, 'user')
	if (prevUsers.length >= 3) return
	// const radius = 16.5 // 16.5 | 34.5 | 50
	const pos = getCircleEdgePos(radius)
	if (prevUsers.length === 0) {
		return addUser1st({ pos, user, setUsers1st })
	} else {
		// @TODO: 간혹 겹치는 요소 발생 오류 해결하기
		const isInRange = prevUsers.some((user) => {
			const interDistance = Math.sqrt(
				(pos.x - user.pos.x) * (pos.x - user.pos.x) + (pos.y - user.pos.y) * (pos.y - user.pos.y)
			)

			// 거리가 13 미만이면
			return interDistance > 15
		})
		if (isInRange) {
			return addUser1st({ pos, user, setUsers1st })
		} else {
			// 겹치면 다른 값으로 재귀 호출
			user1stPositioning({ setUsers1st, user, radius, maxNum })
		}
	}
}
