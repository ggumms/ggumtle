const PostReviewButton = () => {
	const handleClickPostReview = () => {
		// Todo: 후기 작성분 저장, 후기 이미지 처리 로직 작성, 달성 여부 처리 필요
		console.log('후기 등록 버튼 클릭')
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
