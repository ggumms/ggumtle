import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileBucketWide from '../../components/ProfileBucketWide'

const Rader = () => {
	const bucketInfo = {
		title: '구독자 100만명 달성하기',
		color: '[#52A88C]',
		dDay: 168,
		isLock: true,
	}

	return (
		<div>
			This is Rader Page
			<ProfileBucketWide bucketInfo={bucketInfo}/>
			<Outlet />
		</div>
	)
}

export default Rader
