import { useState } from 'react'
import ActiveLikeButton from './ActiveLikeButton'
import UnActiveLikeButton from './UnActiveLikeButton'
import { putReviewLikeStatus } from '../../api'

interface ILikeButtonProps {
	commentId: number
	likeStatus: boolean
	hasOwn: boolean
	reviewOwnerImage: string | null
}

const LikeButton = ({ commentId, likeStatus, hasOwn, reviewOwnerImage }: ILikeButtonProps) => {
	const [isLikeActive, setIsLikeActive] = useState(likeStatus)
	const handleChangeLikeStatus = async () => {
		const LikeRes = await putReviewLikeStatus(commentId)
		if (LikeRes === 'success') {
			setIsLikeActive((prev: boolean) => !prev)
		}
	}
	return (
		<>
			{isLikeActive ? (
				<ActiveLikeButton handleClick={handleChangeLikeStatus} profileImage={reviewOwnerImage} />
			) : (
				hasOwn && <UnActiveLikeButton handleClick={handleChangeLikeStatus} />
			)}
		</>
	)
}

export default LikeButton
