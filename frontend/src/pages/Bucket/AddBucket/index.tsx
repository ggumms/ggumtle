import { useEffect } from 'react'
import MultiPageLayout from '../../../components/layout/MutiPageLayout/MultiPageLayout'
import { addBucketHeaderList } from '../../../router'
import { useBucketStore } from '../../../store/bucketStore'
import { icons } from './../../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../../interfaces'
import { useRouter } from '../../../hooks/useRouter'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'

const AddBucket = () => {
	const { resetCategory, resetBucketColor } = useBucketStore()
	const { goBack } = useRouter()

	// :: Header
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = { left: icons.BACK, center: '꿈틀 생성하기', right: undefined }
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	// :: Clear State
	useEffect(() => {
		// 정리 함수
		// - 전역 state 초기화
		// - page 전환 시 AddBucket에서 사용했던 전역 state들을 초기화하기 위한 용도
		return () => {
			resetCategory()
			resetBucketColor()
		}
	}, [resetCategory])

	return (
		<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
			<MultiPageLayout headerData={addBucketHeaderList} hasIcon={false} />
		</WithHeaderLayout>
	)
}

export default AddBucket
