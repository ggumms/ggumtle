import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileBucketWide from '../../components/ProfileBucketWide'

const Rader = () => {
	return (
		<div>
			This is Rader Page
			<ProfileBucketWide />
			<Outlet />
		</div>
	)
}

export default Rader
