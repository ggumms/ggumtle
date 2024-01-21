import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationHeader from '../../NavigationHeader'
import { MultiPageHeaderInfo } from '../../../types/router'

interface MultiPageLayoutProps {
	headerData: MultiPageHeaderInfo[]
}
const MultiPageLayout = ({ headerData }: MultiPageLayoutProps) => {
	return (
		<div>
			<NavigationHeader headerData={headerData} />
			<Outlet />
		</div>
	)
}

export default MultiPageLayout
