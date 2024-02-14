import { ChangeEvent, KeyboardEvent, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { postReviewComment } from '../../api'
import { useCommentStore } from '../../../../store/detailStore'

interface ICommentInput {
	reviewId: string
	setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>
}

// Todo: Pwa 환경에서 해당 컴포넌트가 언마운트 될때 키보드가 내려가는지 확인 필요
const CommentInput = ({ reviewId, setIsInputFocused }: ICommentInput) => {
	const { commentText, setCommentText } = useCommentStore()
	const inputRef = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient() // QueryClient 인스턴스 사용

	const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value
		setCommentText(text)
	}
	const handleFocusInput = () => {
		setIsInputFocused(true)
	}
	const handleBlurInput = () => {
		setIsInputFocused(false)
	}
	const handlePressEnter = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return
		}
		const commentRes = await postReviewComment(reviewId, commentText)
		if (commentRes === 'success') {
			setCommentText('')
			console.log('refetching!')
			queryClient.refetchQueries({ queryKey: ['comments', reviewId] })
		}
	}
	const handleSubmitComment = async () => {
		const commentRes = await postReviewComment(reviewId, commentText)
		if (commentRes === 'success') {
			setCommentText('')
			console.log('refetching!')
			queryClient.refetchQueries({ queryKey: ['comments', reviewId] })
		}
	}

	return (
		<div className="comment-input fixed bottom-0 flex w-full px-6 py-3 bg-white border-t-[1px] border-gray">
			<img src="/public/defaultProfile.svg" />
			<input
				ref={inputRef}
				type="text"
				placeholder="댓글 입력하기..."
				value={commentText}
				onChange={handleCommentChange}
				onFocus={handleFocusInput}
				onBlur={handleBlurInput}
				className="px-3 grow focus:outline-none"
				onKeyDown={handlePressEnter}
			/>
			<button
				type="button"
				onClick={handleSubmitComment}
				className={`${commentText ? 'text-point1' : 'text-gray'}`}
			>
				등록
			</button>
		</div>
	)
}

export default CommentInput
