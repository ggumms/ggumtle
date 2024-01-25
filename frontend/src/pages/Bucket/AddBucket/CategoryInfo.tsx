import React from 'react'
import { Link } from 'react-router-dom'

import CategorySelect from '../../../components/CategorySelect'
import { categoryData } from '../../../utils/category'

const CategoryInfo = () => {
	return (
		<div>
			<CategorySelect categoryData={categoryData} />
			{/* 페이지 전환 시 state를 유지하는지 테스트 하기 위한 버튼 */}
			<Link to="/">다음</Link>
		</div>
	)
}

export default CategoryInfo
