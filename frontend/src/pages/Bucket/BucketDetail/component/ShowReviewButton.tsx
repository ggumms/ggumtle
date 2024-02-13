import NavigateButton from '../../../../components/NavigateButton'

interface IShowReviewButtonProps {
	reviewId: number
}
const ShowReviewButton = ({ reviewId }: IShowReviewButtonProps) => {
	return <NavigateButton path={`/review/${reviewId}`}>후기 보기</NavigateButton>
}

export default ShowReviewButton
