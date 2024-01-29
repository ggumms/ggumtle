import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MultiPageHeaderInfo } from '../types/router'
import { motion } from 'framer-motion'
import { useRouter } from '../hooks/useRouter'

interface NavigationHeaderProps {
	headerData: MultiPageHeaderInfo[]
}

const NavigationHeader = ({ headerData }: NavigationHeaderProps) => {
	const [selectedIndex, setSelectedIndex] = useState<number>()
	const { currentPath } = useRouter()

	useEffect(() => {
		headerData.forEach((item, index) => {
			if (currentPath.includes(item.path)) {
				setSelectedIndex(index)
			}
		})

		// bucket/write/{children}으로 안들어왔을 경우
		if (selectedIndex === undefined) {
			setSelectedIndex(0)
			return
		}
	}, [currentPath])

	return (
		<ul className={`flex gap-[2px]`}>
			{headerData.map((headerItem, index) => {
				return (
					<li key={`hedaer-${index}`} className={`w-16 relative`}>
						<NavLink
							to={headerItem.path}
							className={
								'inline-block w-full text-center py-2' +
								(selectedIndex === index ? ' text-[#454645] font-[700]' : ' text-[#D9D9D9]   ')
							}
						>
							{headerItem.name}
						</NavLink>
						{selectedIndex === index && (
							<motion.div
								layoutId="underline"
								className="absolute h-[1px] bottom-1 w-full bg-black"
							/>
						)}
					</li>
				)
			})}
		</ul>
	)
}

export default NavigationHeader
