import { postReview } from '../api'

interface IQuickSaveButtonProps {
	bucketId: string
	title: string
	context: string
}
const QuickSaveButton = ({ bucketId, title, context }: IQuickSaveButtonProps) => {
	const handleClickQuickSave = async () => {
		// Todo: 후기 작성분 저장, 후기 이미지 처리 로직 작성 필요
		const reviewId = await postReview(bucketId, title, context, false)
		if (reviewId) {
			alert('임시저장되었습니다.')
		}
	}
	return (
		<button
			onClick={handleClickQuickSave}
			className="w-full block text-lg border-unActive border-[1px] text-disabled font-bold py-4 rounded-[5px]"
		>
			<p>임시 저장</p>
		</button>
	)
}

export default QuickSaveButton
