import React from 'react'
import { ICategoryItem } from '../interfaces'

import { bgColorClass, textColorClass, borderColorClass } from '../constants/dynamicClass'
import { ImPlus } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa6'

interface CategorySelectProps {
	categoryData: ICategoryItem[]
}

const CategorySelect = ({ categoryData }: CategorySelectProps) => {
	const handleCategorySelect = (event: React.MouseEvent<HTMLLIElement>) => {
		const { index } = event.currentTarget.dataset
		if (index) {
			const numIndex = parseInt(index)
			console.log(numIndex + 'item clicked!')
			categoryData[numIndex].isSelected = !categoryData[numIndex].isSelected
		}
	}

	return (
		<ul className="flex flex-wrap gap-x-2 gap-y-4">
			{categoryData.map((item, index) => {
				return (
					<li
						key={`category-${index}`}
						data-index={index}
						onClick={handleCategorySelect}
						className={
							`flex items-center font-bold px-4 py-[10px] rounded-[8px] ${borderColorClass[item.color]} border-2 text-sm` +
							' ' +
							(item.isSelected
								? `bg-white ${textColorClass[item.color]}`
								: `${bgColorClass[item.color]} text-white`)
						}
					>
						{item.isSelected ? (
							<FaCheck size={15} className="mr-1 " />
						) : (
							<ImPlus size={8} className="mr-1" />
						)}

						<p>{item.name}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default CategorySelect
