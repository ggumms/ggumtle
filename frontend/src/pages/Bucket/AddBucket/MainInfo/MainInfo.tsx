import React from 'react'
import SelectBucketColor from './components/SelectBucketColor'
import Title from './components/Title'
import TimeCapsule from './components/TimeCapsule'

const MainInfo = () => {
	return (
		// Todo: 여기서 flex style 적용하기
		// Todo: fieldset 이용해서 input 영역 구분하고, gap 이용해서 style 적용하기
		<div>
			<SelectBucketColor />
			<Title />
			<TimeCapsule />
		</div>
	)
}

export default MainInfo
