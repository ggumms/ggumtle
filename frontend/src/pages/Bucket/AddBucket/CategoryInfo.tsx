import React from 'react'
import CategorySelect from '../../../components/CategorySelect'
import { ICategoryItem } from '../../../interfaces'

const CategoryInfo = () => {
	const categoryData: ICategoryItem[] = [
		{ name: '환경', color: 'green', isSelected: false },
		{ name: '자선활동', color: 'lightGreen', isSelected: false },
		{ name: '인간관계', color: 'red', isSelected: false },
		{ name: '휴식', color: 'yellow', isSelected: true },
		{ name: '연애', color: 'pink', isSelected: false },
		{ name: '운동', color: 'mint', isSelected: true },
		{ name: '여행', color: 'orange', isSelected: false },
		{ name: '언어', color: 'skyBlue', isSelected: false },
		{ name: '문화', color: 'purple', isSelected: false },
		{ name: '도전', color: 'beige', isSelected: false },
		{ name: '취미', color: 'sandPink', isSelected: false },
		{ name: '직장', color: 'brown', isSelected: false },
	]

	return (
		<div>
			<CategorySelect categoryData={categoryData} />
		</div>
	)
}

export default CategoryInfo
