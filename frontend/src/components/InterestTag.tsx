import { bgColorClass } from '../constants/dynamicClass'
import { categoryData } from '../utils/category'

const InterestTag = ({ tag }: { tag: string }) => {
	const color = categoryData.find((item) => item.name === tag)?.color
	return (
		<div
			className={`px-2 py-[1px] inline-block rounded-md text-white text-xs font-light ${bgColorClass[color as string]} mr-1`}
		>
			{tag}
		</div>
	)
}

export default InterestTag
