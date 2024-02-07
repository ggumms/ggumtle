import { EmptyLike } from '../../../../assets/svgs'

const UnActiveLikeButton = () => {
	return (
		<button className="absolute right-0 inline-block translate-y-1/2 bottom-1/2">
			<EmptyLike width={16} height={14.4} />
		</button>
	)
}

export default UnActiveLikeButton
