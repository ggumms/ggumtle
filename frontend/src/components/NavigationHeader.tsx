import React from 'react'
import { NavLink } from 'react-router-dom'
import { MultiPageHeaderInfo } from '../types/router'

interface NavigationHeaderProps {
	headerData: MultiPageHeaderInfo[]
}

const NavigationHeader = ({ headerData }: NavigationHeaderProps) => {
	// const numOfHeaderItem = headerData.length
	const borderBottomSize = '64px'
	const listGapSize = '8px'

	return (
		<ul className={`flex gap-[${listGapSize}] after:w-[${borderBottomSize}] after:h-[2px]`}>
			{headerData.map((headerItem, index) => {
				return (
					<li key={`hedaer-${index}`} className={`w-[${borderBottomSize}]`}>
						<NavLink
							to={headerItem.path}
							className={({ isActive }) =>
								isActive
									? 'text-[#454645] font-[700] border-b-2 inline-block w-full text-center'
									: 'text-[#D9D9D9] inline-block w-full text-center'
							}
						>
							{headerItem.name}
						</NavLink>
					</li>
				)
			})}
		</ul>
	)
}

export default NavigationHeader
