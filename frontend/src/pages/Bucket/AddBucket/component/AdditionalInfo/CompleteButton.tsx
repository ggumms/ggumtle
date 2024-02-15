import { useMemo } from 'react'
import { IBaseBucketInfo } from '../../../../../interfaces'
import { useBucketStore } from '../../../../../store/bucketStore'
import { postBucket, postBucketImage } from '../../api'
import { formatDate } from './../../../../../utils/date'
import { getCurrentCategories } from '../../../../../utils/category'
import { useRouter } from '../../../../../hooks/useRouter'
import { deleteBucket } from '../../../BucketDetail/api'

// Todo: 추후에는 이전 페이지 기록 기능을 추가해서 이전 페이지로 이동하게 만들기
const CompleteButton = () => {
	const {
		bucketTitle,
		timeCapsule,
		selectedInfo,
		bucketColor,
		createdDate,
		period,
		isPrivate,
		bucketImage,
	} = useBucketStore()
	const { routeTo } = useRouter()

	let errorMessage = ''

	const bucketData: IBaseBucketInfo | null = useMemo(() => {
		if (getCurrentCategories(selectedInfo).length === 0) {
			errorMessage = '카테고리를 선택해주세요!'
			return null
		} else if (bucketColor === null) {
			errorMessage = '색상을 선택해주세요!'
			return null
		} else if (bucketTitle.length === 0) {
			errorMessage = '제목을 입력해주세요!'
			return null
		}

		return {
			title: bucketTitle,
			timeCapsule,
			color: bucketColor,
			createdDate: formatDate(createdDate),
			reminderDate: period,
			category: getCurrentCategories(selectedInfo),
			isPrivate,
			longitude: null,
			latitude: null,
			address: null,
		}
	}, [bucketTitle, timeCapsule, bucketColor, createdDate, period, isPrivate, bucketImage])

	const handleSubmitBucket = async () => {
		if (bucketData === null) {
			alert(errorMessage)
			return
		}

		// 1. 버킷 정보 먼저 전송
		const bucketId = await postBucket(bucketData)
		// 2. 전송 성공 시 이미지 정보가 있다면 정보 전송
		if (bucketId && bucketImage instanceof File) {
			const imageFormData = new FormData()
			imageFormData.append('bucketImage', bucketImage)

			const imageUrl = await postBucketImage(imageFormData, bucketId) // use for post image to server
			if (imageUrl) routeTo('/myPage')
			else {
				await deleteBucket(bucketId + '')
			}
		} else {
			alert('네트워크에 문제가 발생했습니다. 다시 시도해주세요.')
		}
	}

	return (
		<button
			onClick={handleSubmitBucket}
			className="w-full text-white text-lg font-bold border-[1px] py-4 rounded-[5px] bg-point1"
		>
			꿈틀 생성하기
		</button>
	)
}

export default CompleteButton
