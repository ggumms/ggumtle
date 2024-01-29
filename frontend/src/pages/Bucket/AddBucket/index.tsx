import React, { useEffect } from 'react'
import MultiPageLayout from '../../../components/layout/MutiPageLayout/MultiPageLayout'
import { addBucketHeaderList } from '../../../router'
import { useBucketStore } from '../../../store/bucketStore'

const AddBucket = () => {
	const { resetCategory } = useBucketStore()

	useEffect(() => {
		// 정리 함수
		// - 전역 state 초기화
		// - page 전환 시 AddBucket에서 사용했던 전역 state들을 초기화하기 위한 용도
		return () => {
			resetCategory()
		}
	}, [resetCategory])

	return <MultiPageLayout headerData={addBucketHeaderList} hasIcon={false} />
}

export default AddBucket
