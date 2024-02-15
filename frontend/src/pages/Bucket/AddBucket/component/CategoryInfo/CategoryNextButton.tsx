import NavigateButton from '../../../../../components/NavigateButton'
import { useBucketStore } from '../../../../../store/bucketStore'

const CategoryNextButton = () => {
	const { selectedInfo } = useBucketStore()
	const isDisable = !Object.values(selectedInfo).find((isSelected) => isSelected === true)

	return (
		<>
			<NavigateButton path="/bucket/write/main" isDisable={isDisable}>
				다음
			</NavigateButton>
		</>
	)
}

export default CategoryNextButton
