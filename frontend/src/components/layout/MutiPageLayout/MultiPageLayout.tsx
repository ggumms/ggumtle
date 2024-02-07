import { Outlet } from 'react-router-dom'
import NavigationHeader from '../../NavigationHeader'
import { MultiPageHeaderInfo } from '../../../types/router'

interface MultiPageLayoutProps {
	headerData: MultiPageHeaderInfo[]
	hasIcon: boolean
}

const MultiPageLayout = ({ headerData, hasIcon }: MultiPageLayoutProps) => {
	return (
		<div className={`flex flex-col grow ${hasIcon && 'pt-[10px]'}`}>
			<NavigationHeader headerData={headerData} hasIcon={hasIcon} />
			<Outlet />
		</div>
	)
}

export default MultiPageLayout
