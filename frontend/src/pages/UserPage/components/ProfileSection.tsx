import React from 'react'
import ProfileBucket from '../../../components/ProfileBucket'
import { UserInfoType } from '../../../interfaces'

const ProfileSection = () => {
	const userInfo: UserInfoType = {
		userId: 1,
		userProfileImage: 'url',
		userNickname: 'junho',
		category: ['인간관계', '여행', '직장'],
		bucketId: 2,
		bucketTitle: '구독자 100만명 달성하기',
		dayCount: 14,
		color: 'mint',
		isAchieved: true,
		owner: true,
		isFollowing: null,
	}

	const { bucketTitle, color, dayCount } = userInfo
	return (
		<div>
			profile
			<ProfileBucket title={bucketTitle} color={color} dayCount={dayCount} isLock={null} />
		</div>
	)
}

export default ProfileSection
