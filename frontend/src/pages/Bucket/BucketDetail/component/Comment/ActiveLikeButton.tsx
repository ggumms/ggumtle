import { EmptyLike } from '../../../../../assets/svgs'

interface IActiveLikeButtonProps {
	handleClick: () => Promise<void>
	profileImage: string | null
}
const ActiveLikeButton = ({ handleClick, profileImage }: IActiveLikeButtonProps) => {
	return (
		<button
			onClick={handleClick}
			className="absolute right-0 inline-block translate-y-1/2 bottom-1/2"
		>
			<img
				src={profileImage ? profileImage : '/defaultProfile.svg'}
				alt="좋아요 활성화 아이콘"
				className="w-4 h-4 rounded-full"
			/>
			<EmptyLike
				fill="red"
				stroke="red"
				width={12}
				height={10.6}
				className="absolute left-2 top-2"
			/>
		</button>
	)
}

export default ActiveLikeButton
