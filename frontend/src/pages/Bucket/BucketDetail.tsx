import React from 'react'
import UserProfile from '../../components/UserProfile'
import { UserInfoType } from '../../interfaces'

const BucketDetail = () => {
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

	return (
		<>
			<div>This is BucketDetail</div>
			<UserProfile type="detail" userInfo={userInfo} />
		</>
	)
}

export default BucketDetail
