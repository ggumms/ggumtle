import NavigateButton from '../../../../components/NavigateButton'

interface IAchieveDreamButtonProps {
	id: string
}

const AchieveDreamButton = ({ id }: IAchieveDreamButtonProps) => {
	return <NavigateButton path={`/bucket/achieve/${id}`}>꿈 이루기</NavigateButton>
}

export default AchieveDreamButton
