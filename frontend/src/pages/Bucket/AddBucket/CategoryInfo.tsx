import React from 'react'

import CategorySelect from '../../../components/CategorySelect'
import { categoryData } from '../../../utils/category'
import NavigateButton from '../../../components/NavigateButton'
import PageDescription from '../../../components/PageDescription'

const CategoryInfo = () => {
	return (
		<section className="flex flex-col pt-12 grow">
			<section>
				<PageDescription type={'categoryWrite'} />
			</section>
			<section className="pt-20 grow">
				<CategorySelect categoryData={categoryData} />
			</section>
			{/* 페이지 전환 시 state를 유지하는지 테스트 하기 위한 버튼 */}
			<NavigateButton path="/bucket/write/main" isDisable={true}>
				다음
			</NavigateButton>
		</section>
	)
}

export default CategoryInfo
