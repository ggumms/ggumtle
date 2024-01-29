import React, { useEffect } from 'react'
import MultiPageLayout from '../../../components/layout/MutiPageLayout/MultiPageLayout'
import { addBucketHeaderList } from '../../../router'
import { useBucketStore } from '../../../store/bucketStore'
import Header from '../../../components/Header'
import { icons } from './../../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../../interfaces'
import { useRouter } from '../../../hooks/useRouter'

const AddBucket = () => {
	const { resetCategory, resetBucketColor } = useBucketStore()
	const { goBack } = useRouter()

	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = { left: icons.BACK, center: '꿈틀 생성하기', right: undefined }
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

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
		<>
			<Header menu={headerMenu} func={headerFunc} />
			<MultiPageLayout headerData={addBucketHeaderList} />
		</>
	)
}

export default AddBucket
