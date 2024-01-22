import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ProfileBucketWide from '../../components/ProfileBucketWide'
import Header from '../../components/Header'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../constants/header-icons'

const Rader = () => {
	const navigate = useNavigate()
	const menu: IMenu = {
		left: icons.BACK,
		center: '방명록',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate(-1),
		right_func: undefined,
	}
	const bucketInfo = {
		title: '구독자 100만명 달성하기',
		color: '[#52A88C]',
		dDay: 168,
		isLock: true,
	}

	return (
		<div>
			<Header menu={menu} func={func} />
			This is Rader Page
			<ProfileBucketWide bucketInfo={bucketInfo} />
			<Outlet />
		</div>
	)
}

export default Rader
