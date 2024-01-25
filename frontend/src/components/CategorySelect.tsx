import React from 'react'

import { useBucketStore } from '../store/bucketStore'
import { isCategoryType } from '../utils/typeFilter'
import { CategoryType, ICategoryItem } from '../interfaces'

import { bgColorClass, textColorClass, borderColorClass } from '../constants/dynamicClass'
import { HiPlusSm } from 'react-icons/hi'
import { FaCheck } from 'react-icons/fa6'

interface CategorySelectProps {
	categoryData: ICategoryItem[]
}

const CategorySelect = ({ categoryData }: CategorySelectProps) => {
	const { selectedInfo, addCategory, removeCategory } = useBucketStore()

	// event handlers
	const handleCategorySelect = (event: React.MouseEvent<HTMLLIElement>) => {
		const selectedName = event.currentTarget.dataset.name as CategoryType

		if (selectedName && isCategoryType(selectedName)) {
			selectedInfo[selectedName] ? removeCategory(selectedName) : addCategory(selectedName)
		}
	}

	return (
		<ul className="flex flex-wrap gap-x-2 gap-y-4">
			{categoryData.map((item, index) => {
				return (
					<li
						key={`category-${index}`}
						data-name={item.name}
						onClick={handleCategorySelect}
						className={
							`flex items-center font-bold px-4 py-[10px] rounded-[8px] ${borderColorClass[item.color]} border-2 text-sm` +
							' ' +
							(selectedInfo[item.name]
								? `${bgColorClass[item.color]} text-white`
								: `bg-white ${textColorClass[item.color]}`)
						}
					>
						{selectedInfo[item.name] ? (
							<FaCheck size={15} className="mr-1 " />
						) : (
							<HiPlusSm size={15} className="mr-1" />
						)}

						<p>{item.name}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default CategorySelect
