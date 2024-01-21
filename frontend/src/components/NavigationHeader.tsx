import React from 'react'
import { NavLink } from 'react-router-dom'
import { MultiPageHeaderInfo } from '../types/router'

interface NavigationHeaderProps {
	headerData: MultiPageHeaderInfo[]
}

const NavigationHeader = ({ headerData }: NavigationHeaderProps) => {
	return (
		<ul>
			{headerData.map((headerItem, index) => {
				return (
					<li key={`hedaer-${index}`}>
						<NavLink to={headerItem.path}>{headerItem.name}</NavLink>
					</li>
				)
			})}
		</ul>
	)
}

export default NavigationHeader
