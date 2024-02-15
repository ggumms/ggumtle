import NavigateButton from '../../../../components/NavigateButton'

interface IWriteReviewButtonProps {
	bucketId: string
}

const WriteReviewButton = ({ bucketId }: IWriteReviewButtonProps) => {
	return <NavigateButton path={`/review/write/${bucketId}`}>후기 작성하기</NavigateButton>
}

export default WriteReviewButton
