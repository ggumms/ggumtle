import NavigateButton from '../../../components/NavigateButton'

interface IWriteReviewButtonProps {
	id: string
}

const WriteReviewButton = ({ id }: IWriteReviewButtonProps) => {
	return <NavigateButton path={`/review/write/${id}`}>후기 작성하기</NavigateButton>
}

export default WriteReviewButton
