import { useRouter } from '../../../hooks/useRouter'
import { postReview } from '../api'

interface IPostReviewButtonProps {
	bucketId: string
	title: string
	context: string
}

const PostReviewButton = ({ bucketId, title, context }: IPostReviewButtonProps) => {
	const { routeTo } = useRouter()

	const handleClickPostReview = async () => {
		// Todo: 후기 작성분 저장, 후기 이미지 처리 로직 작성, 달성 여부 처리 필요
		const reviewId = await postReview(bucketId, title, context, true)
		if (reviewId) {
			routeTo(`/review/${reviewId}`)
		}
	}

	return (
		<button
			onClick={handleClickPostReview}
			className="w-full block text-lg bg-green text-white font-bold py-4 rounded-[5px]"
		>
			<p>등록</p>
		</button>
	)
}

export default PostReviewButton
