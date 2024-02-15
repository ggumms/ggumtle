import { Link } from 'react-router-dom'
import { UserInfoType } from '../../interfaces'

import { fillColorClass, textColorClass } from '../../constants/dynamicClass'
import {
	DummyUser1,
	DummyUser2,
	DummyUser3,
	DummyUser4,
	DummyUser5,
	DummyUser6,
	SquareCheck,
} from '../../assets/svgs'
import Ggumtle from '../Ggumtle'
import UserProfileSkeleton from './UserProfileSkeleton'

interface IUserProfileProps {
	isLoading: boolean
	type: 'comment' | 'detail' | 'follow'
	userInfo: UserInfoType | undefined
}

// TODO: 타입이랑 데이터 관리 부분이 변경될 것 같아서 한 파일에 interface 관리
// 꿈틀과 checkbox의 width, height 속성을 같이 사용하기 위해서 achieveIcon으로 용어 통일 및 height, width 분리
export interface ICustomStyle {
	profileSize: string
	nameTextSize: string
	bucketTextSize: string
	achieveIconWidth: number
	achieveIconHeight: number
	profileRightMargin: string
	bucketTitleLeftMargin: string
}
export interface IProfileStyle {
	comment: ICustomStyle
	detail: ICustomStyle
	follow: ICustomStyle
}

const profileStyle: IProfileStyle = {
	comment: {
		profileSize: 'w-[36px] h-[36px]',
		nameTextSize: 'text-[12px]',
		bucketTextSize: 'text-[10px]',
		achieveIconWidth: 12,
		achieveIconHeight: 12,
		profileRightMargin: 'mr-[8px]',
		bucketTitleLeftMargin: 'mr-[8px]',
	},
	detail: {
		profileSize: 'w-[42px] h-[42px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		achieveIconWidth: 14,
		achieveIconHeight: 14,

		profileRightMargin: 'mr-[12px]',
		bucketTitleLeftMargin: 'mr-[12px]',
	},
	follow: {
		profileSize: 'w-[55px] h-[55px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		achieveIconWidth: 14,
		achieveIconHeight: 14,
		profileRightMargin: 'mr-[16px]',
		bucketTitleLeftMargin: 'mr-[6px]',
	},
}

// Todo : title, color, id 있을 경우에만 버킷 정보 띄워주기 + 스타일 조정하기
const UserProfile = ({ type, userInfo, isLoading }: IUserProfileProps) => {
	if (isLoading || userInfo === undefined) {
		return <UserProfileSkeleton type={type} />
	}
	const randomProfile = [
		<DummyUser1 className={`${profileStyle[type].profileSize}`} />,
		<DummyUser2 className={`${profileStyle[type].profileSize}`} />,
		<DummyUser3 className={`${profileStyle[type].profileSize}`} />,
		<DummyUser4 className={`${profileStyle[type].profileSize}`} />,
		<DummyUser5 className={`${profileStyle[type].profileSize}`} />,
		<DummyUser6 className={`${profileStyle[type].profileSize}`} />,
	]

	return (
		<section className="inline-flex">
			<Link to={`/user/${userInfo.userId}`}>
				{/* <img
					src={'/defaultProfile.svg'}
					// src={userInfo.userProfileImage}
					alt="유저 프로필 이미지"
					className={`${profileStyle[type].profileSize} ${profileStyle[type].profileRightMargin}`}
				/> */}
				<div className={`${profileStyle[type].profileRightMargin}`}>
					{userInfo.userProfileImage ? (
						<div className={`${profileStyle[type].profileSize} rounded-full overflow-hidden`}>
							<img src={userInfo.userProfileImage} alt="유저 프로필 이미지" />
						</div>
					) : (
						randomProfile[userInfo.userId % 6]
					)}
				</div>
			</Link>
			<div className={`relative flex flex-col ${type !== 'follow' && 'self-end'} justify-center`}>
				<p className={`font-bold ${profileStyle[type].nameTextSize}`}>{userInfo.userNickname}</p>
				<Link to={`/bucket/${userInfo.bucketId}`} className="flex items-center">
					<p
						className={`inline-block  leading-none ${profileStyle[type].bucketTextSize} ${userInfo.isAchieved && userInfo.bucketColor ? textColorClass[userInfo.bucketColor] : 'text-point1'} ${profileStyle[type].bucketTitleLeftMargin}`}
					>
						{userInfo.bucketTitle}
					</p>
					{userInfo.bucketTitle &&
						(userInfo.isAchieved ? (
							<SquareCheck
								className={`inline-block shrink-0 ${userInfo.bucketColor && fillColorClass[userInfo.bucketColor]} ${profileStyle[type].achieveIconWidth} ${profileStyle[type].achieveIconHeight} `}
							/>
						) : (
							<Ggumtle
								color={userInfo.bucketColor ?? 'transparent'}
								speed={10}
								width={profileStyle[type].achieveIconWidth}
								height={profileStyle[type].achieveIconHeight}
								explanation={`${userInfo.userNickname}님의 버킷이 꿈틀거리고 있어요!`}
							/>
						))}
				</Link>
			</div>
		</section>
	)
}

export default UserProfile
