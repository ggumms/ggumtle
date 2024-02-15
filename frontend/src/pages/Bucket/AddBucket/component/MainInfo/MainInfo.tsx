import SelectBucketColor from './SelectBucketColor'
import Title from './Title'
import TimeCapsule from './TimeCapsule'
import MainNextButton from './MainNextButton'

const MainInfo = () => {
	return (
		<section className="flex flex-col pt-12 pb-12 grow">
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
