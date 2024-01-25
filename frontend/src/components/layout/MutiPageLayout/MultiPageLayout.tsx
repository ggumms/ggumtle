import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationHeader from '../../NavigationHeader'
import { MultiPageHeaderInfo } from '../../../types/router'

interface MultiPageLayoutProps {
	headerData: MultiPageHeaderInfo[]
}

// TODO: div 태그 삭제하기
const MultiPageLayout = ({ headerData }: MultiPageLayoutProps) => {
	return (
		<div className="p-[20px]">
			<NavigationHeader headerData={headerData} />
			<Outlet />
		</div>
	)
}

export default MultiPageLayout
