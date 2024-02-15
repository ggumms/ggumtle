import {
	DummyUser1,
	DummyUser2,
	DummyUser3,
	DummyUser4,
	DummyUser5,
	DummyUser6,
} from '../../../../assets/svgs'
import { IRadarUser } from '../../types/radarUser'

export type RadarElemType = 'first' | 'second' | 'third'

export interface IRadarItemDirection {
	left: number
	bottom: number
}

export interface IUserStyle {
	size: string
	text: string
}

export interface IUserItemStyle {
	first: { style: IUserStyle; direction: IRadarItemDirection }
	second: { style: IUserStyle; direction: IRadarItemDirection }
	third: { style: IUserStyle; direction: IRadarItemDirection }
}

const UserItemStyle: IUserItemStyle = {
	first: {
		style: {
			size: 'w-14 h-14',
			text: 'text-sm',
		},
		direction: {
			left: 45,
			bottom: 35,
		},
	},
	second: {
		style: {
			size: 'w-12 h-12',
			text: 'text-xs',
		},
		direction: {
			left: 45,
			bottom: 38,
		},
	},
	third: {
		style: {
			size: 'w-10 h-10',
			text: 'text-[10px]',
		},
		direction: {
			left: 45,
			bottom: 40,
		},
	},
}

export interface UserItemProps {
	user: IRadarUser
	type: RadarElemType
	handleOpenPreview: (userid: number) => void
}

const UserItem = ({ user, type, handleOpenPreview }: UserItemProps) => {
	const randomProfile = [
		<DummyUser1 className={`${UserItemStyle[type].style.size}`} />,
		<DummyUser2 className={`${UserItemStyle[type].style.size}`} />,
		<DummyUser3 className={`${UserItemStyle[type].style.size}`} />,
		<DummyUser4 className={`${UserItemStyle[type].style.size}`} />,
		<DummyUser5 className={`${UserItemStyle[type].style.size}`} />,
		<DummyUser6 className={`${UserItemStyle[type].style.size}`} />,
	]
	const itemStyle: { position: 'absolute'; left: string; bottom: string } = {
		position: 'absolute',
		left: `${UserItemStyle[type].direction.left + user.pos.x}%`,
		bottom: `${UserItemStyle[type].direction.bottom + user.pos.y}%`,
	}
	return (
		<div
			onClick={() => handleOpenPreview(user.userId)}
			className="inline-flex flex-col items-center animate-floating"
			style={itemStyle}
		>
			<div
				className={`${UserItemStyle[type].style.size} rounded-full overflow-hidden animate-fadeIn`}
			>
				{user.userProfileImage ? (
					<img src={user.userProfileImage} alt="" className="w-full h-full object-cover" />
				) : (
					randomProfile[user.userId % 6]
				)}
			</div>
			<span className={`font-semibold ${UserItemStyle[type].style.text}`}>{user.userNickname}</span>
		</div>
	)
}

export default UserItem
