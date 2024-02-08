const FollowButtons = ({ userId }: { userId: number }) => {
	
	const handleFollowButton = () => {
		console.log('click follow')
	}
	const handleShareButton = () => {
		console.log('click profile share')
	}
	return (
		<div className="flex gap-2 px-4">
			{/* @TODO: 마이페이지일 경우 프로필 편집 버튼이 됨 */}
			<div
				onClick={handleFollowButton}
				className="bg-point1 text-white w-1/2 flex items-center justify-center text-sm h-6 rounded-md"
			>
				팔로우
			</div>
			<div
				onClick={handleShareButton}
				className="bg-lightGray text-point1 w-1/2 flex items-center justify-center text-sm h-6 rounded-md"
			>
				프로필 공유
			</div>
		</div>
	)
}

export default FollowButtons
