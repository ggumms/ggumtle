import PageDescription from '../../../../components/PageDescription'
import BucketImage from './component/BucketImage'
import StartDate from './component/StartDate'
import RemindPeriod from './component/RemindPeriod'
import Private from './component/Private'

const AdditionalInfo = () => {
	return (
		<section>
			<section>
				<PageDescription type={'additionalWrite'} />
			</section>
			<fieldset>
				<BucketImage />
				<StartDate />
				<RemindPeriod />
				<Private />
			</fieldset>
		</section>
	)
}

export default AdditionalInfo
