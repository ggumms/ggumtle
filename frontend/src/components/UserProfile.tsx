import React from 'react'
import { Link } from 'react-router-dom'

import { SvgColorClass } from '../constants/dynamicClass'
import { SquareCheck } from '../assets/svgs'

interface IUserProfileProps {
	type: 'comment' | 'detail' | 'follow'
}

// TODO: 타입이랑 데이터 관리 부분이 변경될 것 같아서 한 파일에 interface 관리
export interface ICustomStyle {
	profileSize: string
	nameTextSize: string
	bucketTextSize: string
	checkboxSize: string
	profileRightMargin: string
	checkboxLeftMargin: string
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
		checkboxSize: 'w-[12px] h-[12px]',
		profileRightMargin: 'mr-[8px]',
		checkboxLeftMargin: 'ml-[8px]',
	},
	detail: {
		profileSize: 'w-[42px] h-[42px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		checkboxSize: 'w-[14px] h-[14px]',
		profileRightMargin: 'mr-[12px]',
		checkboxLeftMargin: 'ml-[12px]',
	},
	follow: {
		profileSize: 'w-[55px] h-[55px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		checkboxSize: 'w-[14px] h-[14px]',
		profileRightMargin: 'mr-[16px]',
		checkboxLeftMargin: 'ml-[6px]',
	},
}

const UserProfile = ({ type = 'detail' }: IUserProfileProps) => {
	return (
		<section className="inline-block">
			<Link to={'/user/1'} className="inline-flex">
				<img
					src=""
					alt="유저 프로필 이미지"
					className={`${profileStyle[type].profileSize} ${profileStyle[type].profileRightMargin}`}
				/>
				<div className="relative flex flex-col self-end justify-center">
					<p className={`${profileStyle[type].nameTextSize}`}>juho</p>
					<Link to={'/bucket/1'} className="flex items-center">
						<p className={`inline-block ${profileStyle[type].nameTextSize}`}>
							유튜브 구독자 20만 달성하기
						</p>
						<SquareCheck
							className={`inline-block ${SvgColorClass['red']} ${profileStyle[type].checkboxSize} ${profileStyle[type].checkboxLeftMargin}`}
						/>
					</Link>
				</div>
			</Link>
		</section>
	)
}

export default UserProfile
