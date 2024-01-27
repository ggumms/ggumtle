import React from 'react'

import CategorySelect from '../../../components/CategorySelect'
import { categoryData } from '../../../utils/category'
import NavigateButton from '../../../components/NavigateButton'

const CategoryInfo = () => {
	return (
		<div>
			<CategorySelect categoryData={categoryData} />
			{/* 페이지 전환 시 state를 유지하는지 테스트 하기 위한 버튼 */}
			<NavigateButton path="/bucket/write/main" isDisable={true}>
				다음
			</NavigateButton>
		</div>
	)
}

export default CategoryInfo
