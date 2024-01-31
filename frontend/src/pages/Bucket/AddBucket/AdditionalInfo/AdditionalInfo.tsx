import PageDescription from '../../../../components/PageDescription'
import BucketImage from './component/BucketImage'
import StartDate from './component/StartDate'
import RemindPeriod from './component/RemindPeriod'

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
			</fieldset>
		</section>
	)
}

export default AdditionalInfo
