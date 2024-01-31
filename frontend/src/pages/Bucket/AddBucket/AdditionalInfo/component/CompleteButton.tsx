import NavigateButton from '../../../../../components/NavigateButton'

// Todo: 추후에는 이전 페이지 기록 기능을 추가해서 이전 페이지로 이동하게 만들기
const CompleteButton = () => {
	return (
		<NavigateButton path="/" isDisable={false}>
			꿈틀 생성하기
		</NavigateButton>
	)
}

export default CompleteButton
