import React, { ChangeEvent } from 'react'

interface ReviewTitleProps {
	title: string
	setTitle: React.Dispatch<React.SetStateAction<string>>
}

const ReviewTitle = ({ title, setTitle }: ReviewTitleProps) => {
	const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const inputText = event.currentTarget.value
		setTitle(inputText)
	}

	return (
		<input
			type="text"
			value={title}
			placeholder="후기 제목을 입력해주세요."
			onChange={handleChangeTitle}
			className="w-full mt-6 mb-6 text-2xl font-bold"
		/>
	)
}

export default ReviewTitle
