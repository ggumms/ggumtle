import { useBucketStore } from '../store/bucketStore'
import { isCategoryType } from '../utils/typeFilter'
import { CategoryDataType, CategoryType } from '../interfaces'

import { bgColorClass, textColorClass, borderColorClass } from '../constants/dynamicClass'
import { HiPlusSm } from 'react-icons/hi'
import { FaCheck } from 'react-icons/fa6'

interface CategorySelectProps {
	categoryData: CategoryDataType
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
		<ul className="flex flex-wrap gap-x-2 gap-y-4 ">
			{Object.keys(categoryData).map((categoryName, index) => {
				// ts 타입 문제로 인한 코드
				if (!isCategoryType(categoryName)) {
					return <></>
				}
				return (
					<li
						key={`category-${index}`}
						data-name={categoryName}
						onClick={handleCategorySelect}
						className={
							`flex items-center font-bold px-4 py-[10px] rounded-[8px] ${borderColorClass[categoryData[categoryName]]} border-2 text-sm transition-colors` +
							' ' +
							(selectedInfo[categoryName]
								? `${bgColorClass[categoryData[categoryName]]} text-white`
								: `bg-white ${textColorClass[categoryData[categoryName]]}`)
						}
					>
						{selectedInfo[categoryName] ? (
							<FaCheck size={15} className="mr-1 " />
						) : (
							<HiPlusSm size={15} className="mr-1" />
						)}

						<p>{categoryName}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default CategorySelect
