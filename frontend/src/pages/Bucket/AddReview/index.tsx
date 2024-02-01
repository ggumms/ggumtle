import { useState } from 'react'
import ReviewTitle from './ReviewTitle'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IMenu, IMenuFunc } from '../../../interfaces'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'

const AddReview = () => {
	const [title, setTitle] = useState('')
	const { goBack } = useRouter()

	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = { left: icons.BACK, center: '버킷 후기 작성', right: undefined }
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
			<ReviewTitle title={title} setTitle={setTitle} />
		</WithHeaderLayout>
	)
}

export default AddReview
