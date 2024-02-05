const QuickSaveButton = () => {
	const handleClickQuickSave = () => {
		// Todo: 후기 작성분 저장, 후기 이미지 처리 로직 작성 필요
		console.log('임시 저장 버튼 클릭')
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
