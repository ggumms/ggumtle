import { FaRegCommentDots } from 'react-icons/fa6'

// 피드 총 댓글 개수 컴포넌트
const TotalComment = ({ count }: { count: number }) => {
	return (
		<div className="flex items-center gap-1">
			<FaRegCommentDots size="0.8rem" color="#454645" />
			<div className="text-[10px] text-point1">{count}</div>
		</div>
	)
}

export default TotalComment
