import React from 'react'
import SelectBucketColor from './components/SelectBucketColor'
import Title from './components/Title'
import TimeCapsule from './components/TimeCapsule'
import MainNextButton from './components/MainNextButton'

const MainInfo = () => {
	return (
		<section className="flex flex-col pt-12 pb-12">
			<SelectBucketColor />
			<fieldset className="flex flex-col gap-6 mb-16 mt-14">
				<Title />
				<TimeCapsule />
			</fieldset>
			<MainNextButton />
		</section>
	)
}

export default MainInfo
