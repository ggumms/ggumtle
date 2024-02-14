import { useRouter } from '../../../hooks/useRouter'
import { putReview } from '../api'

interface IModifyButtonProps {
	bucketId: string
	title: string
	context: string
}

const ModifyButton = ({ bucketId, title, context }: IModifyButtonProps) => {
	const { routeTo } = useRouter()

	const handleClickPostReview = async () => {
		// Todo: 후기 작성분 저장, 후기 이미지 처리 로직 작성, 달성 여부 처리 필요
		const reviewId = await putReview(bucketId, title, context)
		if (reviewId) {
			routeTo(`/review/${reviewId}`)
		}
	}

	return (
		<button
			onClick={handleClickPostReview}
			className="w-full block text-lg bg-green text-white font-bold py-4 rounded-[5px]"
		>
			<p>수정하기</p>
		</button>
	)
}

export default ModifyButton
