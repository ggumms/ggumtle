import React from 'react'
import SelectBucketColor from './components/SelectBucketColor'
import Title from './components/Title'
import TimeCapsule from './components/TimeCapsule'

const MainInfo = () => {
	return (
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
