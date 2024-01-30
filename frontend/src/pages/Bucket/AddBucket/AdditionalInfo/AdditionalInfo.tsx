import React from 'react'
import PageDescription from '../../../../components/PageDescription'
import BucketImage from './component/BucketImage'

const AdditionalInfo = () => {
	return (
		<section>
			<section>
				<PageDescription type={'additionalWrite'} />
			</section>
			<fieldset>
				<BucketImage />
			</fieldset>
		</section>
	)
}

export default AdditionalInfo
