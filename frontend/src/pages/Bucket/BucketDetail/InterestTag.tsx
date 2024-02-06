import { bgColorClass } from '../../../constants/dynamicClass'
import { CategoryType } from '../../../interfaces'
import { categoryData } from '../../../utils/category'

const InterestTag = ({ tag }: { tag: CategoryType }) => {
	const color = categoryData[tag]
	return (
		<li
			className={`px-2 py-[5px] inline-block rounded-md text-white text-sm font-light ${bgColorClass[color]} mr-1`}
		>
			{tag}
		</li>
	)
}

export default InterestTag
