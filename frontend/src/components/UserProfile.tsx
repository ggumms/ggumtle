import React from 'react'
import { Link } from 'react-router-dom'
import { UserInfoType } from '../interfaces'

import { fillColorClass, textColorClass } from '../constants/dynamicClass'
import { SquareCheck } from '../assets/svgs'
import Ggumtle from './Ggumtle'

interface IUserProfileProps {
	type: 'comment' | 'detail' | 'follow'
	userInfo: UserInfoType
}

// TODO: 타입이랑 데이터 관리 부분이 변경될 것 같아서 한 파일에 interface 관리
// 꿈틀과 checkbox의 width, height 속성을 같이 사용하기 위해서 achieveIcon으로 용어 통일 및 height, width 분리
export interface ICustomStyle {
	profileSize: string
	nameTextSize: string
	bucketTextSize: string
	achieveIconWidth: string
	achieveIconHeight: string
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
		achieveIconWidth: 'w-[12px]',
		achieveIconHeight: 'h-[12px]',
		profileRightMargin: 'mr-[8px]',
		bucketTitleLeftMargin: 'mr-[8px]',
	},
	detail: {
		profileSize: 'w-[42px] h-[42px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		achieveIconWidth: 'w-[14px]',
		achieveIconHeight: 'h-[14px]',
		profileRightMargin: 'mr-[12px]',
		bucketTitleLeftMargin: 'mr-[12px]',
	},
	follow: {
		profileSize: 'w-[55px] h-[55px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		achieveIconWidth: 'w-[14px]',
		achieveIconHeight: 'h-[14px]',
		profileRightMargin: 'mr-[16px]',
		bucketTitleLeftMargin: 'mr-[6px]',
	},
}

// Todo: nickname에 bold 처리 필요
const UserProfile = ({ type = 'comment', userInfo }: IUserProfileProps) => {
	return (
		<section className="inline-block">
			<Link to={'/user/1'} className="inline-flex">
				<img
					src={userInfo.userProfileImage}
					alt="유저 프로필 이미지"
					className={`${profileStyle[type].profileSize} ${profileStyle[type].profileRightMargin}`}
				/>

				<div className="relative flex flex-col self-end justify-center">
					<p className={`${profileStyle[type].nameTextSize}`}>{userInfo.userNickname}</p>
					<Link to={'/bucket/1'} className="flex items-center">
						<p
							className={`inline-block  leading-none ${profileStyle[type].bucketTextSize} ${userInfo.isAchieved ? textColorClass[userInfo.color] : 'text-point1'} ${profileStyle[type].bucketTitleLeftMargin}`}
						>
							{userInfo.bucketTitle}
						</p>
						{userInfo.isAchieved ? (
							<SquareCheck
								className={`inline-block ${fillColorClass[userInfo.color]} ${profileStyle[type].achieveIconWidth} ${profileStyle[type].achieveIconHeight} `}
							/>
						) : (
							<Ggumtle
								color={userInfo.color}
								speed={10}
								width={profileStyle[type].achieveIconWidth}
								height={profileStyle[type].achieveIconHeight}
								explanation={`${userInfo.userNickname}님의 버킷이 꿈틀거리고 있어요!`}
							/>
						)}
					</Link>
				</div>
			</Link>
		</section>
	)
}

export default UserProfile
