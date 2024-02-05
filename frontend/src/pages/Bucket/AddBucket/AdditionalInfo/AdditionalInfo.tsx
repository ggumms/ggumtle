import PageDescription from '../../../../components/PageDescription'
import BucketImage from './component/BucketImage'
import StartDate from './component/StartDate'
import RemindPeriod from './component/RemindPeriod'
import Private from './component/Private'
import CompleteButton from './component/CompleteButton'

const AdditionalInfo = () => {
	return (
		<section className="pb-12">
			<section className="mt-10 mb-7">
				<PageDescription type={'additionalWrite'} />
			</section>
			<fieldset className="flex flex-col gap-8 mb-14">
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
