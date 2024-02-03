import { useEffect, useState } from 'react'
import ReviewTitle from './ReviewTitle'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IMenu, IMenuFunc } from '../../../interfaces'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'

import NavigateButton from '../../../components/NavigateButton'
import TextEditor from './TextEditor'

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
				<NavigateButton path="/" isDisable={true}>
					<p>데모 버튼 1</p>
				</NavigateButton>
				<NavigateButton path="/" isDisable={false}>
					<p>데모 버튼 2</p>
				</NavigateButton>
			</div>
		</WithHeaderLayout>
	)
}

export default AddReview
