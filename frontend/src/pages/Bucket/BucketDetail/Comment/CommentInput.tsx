import { ChangeEvent, useState } from 'react'

const CommentInput = () => {
	const [commentText, setCommentText] = useState('')
	const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value
		setCommentText(text)
	}

	return (
		<div className="fixed bottom-0 flex w-full px-6 py-3 bg-white border-t-[1px] border-gray">
			<img src="/public/defaultProfile.svg" />
			<input
				type="text"
				placeholder="댓글 입력하기..."
				value={commentText}
				onChange={handleCommentChange}
				className="px-3 grow focus:outline-none"
			/>
			<button type="button" className={`${commentText ? 'text-point1' : 'text-gray'}`}>
				등록
			</button>
		</div>
	)
}

export default CommentInput
