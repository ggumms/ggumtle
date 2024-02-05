import { IRadarUser } from "../../types/radarUser"

export type RadarElemType = 'first' | 'second' | 'third'

export interface IUserDirection {
	left: number
	bottom: number
}

export interface IUserStyle {
	size: string
	text: string
}

export interface IUserElementStyle {
	first: { style: IUserStyle; direction: IUserDirection }
	second: { style: IUserStyle; direction: IUserDirection }
	third: { style: IUserStyle; direction: IUserDirection }
}

const UserElementStyle: IUserElementStyle = {
	first: {
		style: {
			size: 'w-14 h-14',
			text: 'text-base',
		},
		direction: {
			left: 45,
			bottom: 40,
		},
	},
	second: {
		style: {
			size: 'w-12 h-12',
			text: 'text-sm',
		},
		direction: {
			left: 45,
			bottom: 40,
		},
	},
	third: {
		style: {
			size: 'w-10 h-10',
			text: 'text-xs',
		},
		direction: {
			left: 46,
			bottom: 42,
		},
	},
}

export interface UserItemProps {
	user: IRadarUser
	type: RadarElemType
	handleOpenPreview: (userid: number) => void
}

const UserItem = ({ user, type, handleOpenPreview }: UserItemProps) => {
	const itemStyle: { position: 'absolute'; left: string; bottom: string } = {
		position: 'absolute',
		left: `${UserElementStyle[type].direction.left + user.pos.x}%`,
		bottom: `${UserElementStyle[type].direction.bottom + user.pos.y}%`,
	}
	return (
		<div
			onClick={() => handleOpenPreview(user.userId)}
			className="inline-flex flex-col items-center animate-floating"
			style={itemStyle}
		>
			{/* @TODO: api 통신할 때에는 img 태그로 변경 후 실제 데이터 삽입하기
      <img src="" alt="" /> */}
			<div className={`bg-green animate-fadeIn rounded-full ${UserElementStyle[type].style.size}`}></div>
			<span className={`font-semibold ${UserElementStyle[type].style.text}`}>{user.userNickname}</span>
		</div>
	)
}

export default UserItem
