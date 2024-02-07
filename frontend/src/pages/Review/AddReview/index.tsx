import { useEffect, useState } from 'react'
import ReviewTitle from './ReviewTitle'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IMenu, IMenuFunc } from '../../../interfaces'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'

import TextEditor from './TextEditor'
import QuickSaveButton from './QuickSaveButton'
import PostReviewButton from './PostReviewButton'

// Todo : url을 통해서 현재 버킷 정보를 확인하고 해당 버킷이 사용자의 버킷인지 확인 필요 -> 사용자의 버킷이 아니라면 메인 페이지로 인동
const AddReview = () => {
	const [title, setTitle] = useState('')
	const [reviewText, setReviewText] = useState('')
	useEffect(() => {
		console.log(reviewText)
	}, [reviewText])

	const { goBack } = useRouter()

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
				<QuickSaveButton />
				<PostReviewButton />
			</div>
		</WithHeaderLayout>
	)
}

export default AddReview
