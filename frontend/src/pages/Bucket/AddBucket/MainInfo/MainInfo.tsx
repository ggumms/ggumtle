import React from 'react'
import SelectBucketColor from './components/SelectBucketColor'
import Title from './components/Title'
import TimeCapsule from './components/TimeCapsule'

const MainInfo = () => {
	return (
		// Todo: 여기서 flex style 적용하기
		// Todo: fieldset 이용해서 input 영역 구분하고, gap 이용해서 style 적용하기
		<section className="flex flex-col pt-11">
			<SelectBucketColor />
			<fieldset className="flex flex-col gap-6 mb-16 mt-14">
				<Title />
				<TimeCapsule />
			</fieldset>
		</section>
	)
}

export default MainInfo
