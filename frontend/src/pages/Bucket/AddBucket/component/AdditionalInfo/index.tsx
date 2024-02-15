import PageDescription from '../../../../../components/PageDescription'
import BucketImage from './BucketImage'
import StartDate from './StartDate'
import RemindPeriod from './RemindPeriod'
import Private from './Private'
import CompleteButton from './CompleteButton'

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
