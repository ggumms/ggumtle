import React from 'react'
import PageDescription from '../../../../components/PageDescription'
import BucketImage from './component/BucketImage'
import StartDate from './component/StartDate'

const AdditionalInfo = () => {
	return (
		<section>
			<section>
				<PageDescription type={'additionalWrite'} />
			</section>
			<fieldset>
				<BucketImage />
				<StartDate />
			</fieldset>
		</section>
	)
}

export default AdditionalInfo
