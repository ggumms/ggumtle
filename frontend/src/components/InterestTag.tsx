import { bgColorClass } from '../constants/dynamicClass'
import { CategoryType } from '../interfaces'
import { categoryData } from '../utils/category'

const InterestTag = ({ tag }: { tag: CategoryType }) => {
	const color = categoryData[tag]
	return (
		<div
			className={`px-2 py-[1px] inline-block rounded-md text-white text-xs font-light ${bgColorClass[color]} mr-1`}
		>
			{tag}
		</div>
	)
}

export default InterestTag
