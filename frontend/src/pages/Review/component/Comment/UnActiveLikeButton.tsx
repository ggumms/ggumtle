import { EmptyLike } from '../../../../assets/svgs'

interface IUnActiveLikeButtonProps {
	handleClick: () => Promise<void>
}
const UnActiveLikeButton = ({ handleClick }: IUnActiveLikeButtonProps) => {
	return (
		<button
			onClick={handleClick}
			className="absolute right-0 inline-block translate-y-1/2 bottom-1/2"
		>
			<EmptyLike width={16} height={14.4} />
		</button>
	)
}

export default UnActiveLikeButton
