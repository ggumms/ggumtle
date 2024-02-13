import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import ReviewTitle from './ReviewTitle'
import TextEditor from './TextEditor'
import QuickSaveButton from './QuickSaveButton'
import PostReviewButton from './PostReviewButton'

import { useRouter } from '../../../hooks/useRouter'
import { getReviewInfo } from './api'
import { IMenu, IMenuFunc } from '../../../interfaces'
import { icons } from '../../../constants/header-icons'

// Todo : url을 통해서 현재 버킷 정보를 확인하고 해당 버킷이 사용자의 버킷인지 확인 필요 -> 사용자의 버킷이 아니라면 메인 페이지로 인동
const AddReview = () => {
	const [title, setTitle] = useState('')
	const [reviewText, setReviewText] = useState('')
	const { goBack } = useRouter()
	const { bucketId } = useParams()

	// bucketId Path variable로 Number 값이 아닌 값이 들어오면 이전 페이지로 이동
	useEffect(() => {
		if (isNaN(Number(bucketId))) {
			goBack()
			return
		}
	}, [])

	// :: Fetch review data
	const fetchReviewData = async (bucketId: string) => {
		const { title, context, hasReview, hasTemp } = await getReviewInfo(bucketId)
		if (hasReview) {
			goBack()
		}
		if (hasTemp) {
			setTitle(title)
			setReviewText(context)
			alert('작성하던 글이 있으시네요!')
		}
	}
	useEffect(() => {
		bucketId && fetchReviewData(bucketId)
	}, [bucketId])

	// :: Event handler
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = { left: icons.BACK, center: '버킷 후기 작성', right: undefined }
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
			<ReviewTitle title={title} setTitle={setTitle} />
			<TextEditor value={reviewText} setValue={setReviewText} />
			<div className="flex gap-3 pt-12 pb-12">
				{bucketId && <QuickSaveButton bucketId={bucketId} title={title} context={reviewText} />}
				{bucketId && <PostReviewButton bucketId={bucketId} title={title} context={reviewText} />}
			</div>
		</WithHeaderLayout>
	)
}

export default AddReview
