import { useEffect, useState } from 'react'
import { useRouter } from '../../../hooks/useRouter'
import { motion } from 'framer-motion'
import { MultiPageHeaderInfo } from '../../../types/router'
import { NavLink } from 'react-router-dom'

const FollowNavHeader = ({ headerData }: { headerData: MultiPageHeaderInfo[] }) => {
	const [selectedIndex, setSelectedIndex] = useState<number>()
	const { currentPath } = useRouter()

	useEffect(() => {
		// bucket/write/{children}으로 안들어왔을 경우
		if (selectedIndex === undefined) {
				setSelectedIndex(0)
				return
		}
	}, [selectedIndex])

	useEffect(() => {
			headerData.forEach((item, index) => {
					if (currentPath.includes(item.path)) {
							console.log(currentPath + ' ' + item.path)
							setSelectedIndex(index)
					}
			})
	}, [currentPath])

	return (
		<div className="flex items-center justify-around z-10 fixed top-16 right-0 left-0 bg-white ">
			<ul className={`flex gap-[2px] w-full`}>
				{headerData.map((headerItem, index) => {
					return (
						<li key={`hedaer-${index}`} className={`w-1/2 relative`}>
							<NavLink
								to={headerItem.path}
								// Todo : 삭제 예정
								data-id={index}
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
									className="absolute h-[1px] bottom-0 w-full bg-black"
								/>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default FollowNavHeader
