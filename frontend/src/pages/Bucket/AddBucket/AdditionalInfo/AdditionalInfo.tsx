import PageDescription from '../../../../components/PageDescription'
import BucketImage from './component/BucketImage'
import StartDate from './component/StartDate'
import RemindPeriod from './component/RemindPeriod'
import Private from './component/Private'
import CompleteButton from './component/CompleteButton'

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
			<CompleteButton />
		</section>
	)
}

export default AdditionalInfo
