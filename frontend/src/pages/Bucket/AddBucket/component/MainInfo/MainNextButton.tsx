import { useBucketStore } from '../../../../../store/bucketStore'
import NavigateButton from '../../../../../components/NavigateButton'

const MainNextButton = () => {
	const { bucketColor, bucketTitle, timeCapsule } = useBucketStore()
	const isDisable = !(bucketColor && bucketTitle && timeCapsule)

	return (
		<>
			<NavigateButton path="/bucket/write/additional" isDisable={isDisable}>
				다음
			</NavigateButton>
		</>
	)
}

export default MainNextButton
