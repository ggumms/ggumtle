import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationHeader from '../../NavigationHeader'
import { MultiPageHeaderInfo } from '../../../types/router'

interface MultiPageLayoutProps {
	headerData: MultiPageHeaderInfo[]
}

const MultiPageLayout = ({ headerData }: MultiPageLayoutProps) => {
	return (
		<div className="flex flex-col grow">
			<NavigationHeader headerData={headerData} />
			<Outlet />
		</div>
	)
}

export default MultiPageLayout
