import { useState } from 'react'
import ActiveLikeButton from './ActiveLikeButton'
import UnActiveLikeButton from './UnActiveLikeButton'
import { postLikeStatus } from '../../api'

interface ILikeButtonProps {
	commentId: number
	likeStatus: boolean
	hasOwn: boolean
}

const LikeButton = ({ commentId, likeStatus, hasOwn }: ILikeButtonProps) => {
	const [isLikeActive, setIsLikeActive] = useState(likeStatus)
	const handleChangeLikeStatus = async () => {
		const LikeRes = await postLikeStatus(commentId)
		if (LikeRes === 'success') {
			setIsLikeActive((prev: boolean) => !prev)
		}
	}
	return (
		<>
			{isLikeActive ? (
				<ActiveLikeButton handleClick={handleChangeLikeStatus} />
			) : (
				hasOwn && <UnActiveLikeButton handleClick={handleChangeLikeStatus} />
			)}
		</>
	)
}

export default LikeButton
