import Header from '../../../components/Header'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IMenu, IMenuFunc } from '../../../interfaces'

const AddReview = () => {
	const { goBack } = useRouter()

	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = { left: icons.BACK, center: '버킷 후기 작성', right: undefined }
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<div className="flex flex-col h-screen px-5 pt-16 pb-12">
			<Header menu={headerMenu} func={headerFunc} />
			리뷰페이지 입니다.
		</div>
	)
}

export default AddReview
