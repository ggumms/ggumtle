import { FiShare } from 'react-icons/fi'
import { SquareCheck } from '../../../../assets/svgs'
import UserProfile, { IProfileStyle } from '../../../../components/UserProfile/UserProfile'
import { fillColorClass } from '../../../../constants/dynamicClass'
import TotalComment from '../FeedSection/TotalComment'
import TotalReaction from '../FeedSection/TotalReaction'
import { IFeed } from '../FeedSection/index'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'
import { Link } from 'react-router-dom'

// @TODO: 추후 import 해와서 사용하기
const profileStyle: IProfileStyle = {
	comment: {
		profileSize: 'w-[36px] h-[36px]',
		nameTextSize: 'text-[12px]',
		bucketTextSize: 'text-[10px]',
		achieveIconWidth: 12,
		achieveIconHeight: 12,
		profileRightMargin: 'mr-[8px]',
		bucketTitleLeftMargin: 'mr-[8px]',
	},
	detail: {
		profileSize: 'w-[42px] h-[42px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		achieveIconWidth: 14,
		achieveIconHeight: 14,

		profileRightMargin: 'mr-[12px]',
		bucketTitleLeftMargin: 'mr-[12px]',
	},
	follow: {
		profileSize: 'w-[55px] h-[55px]',
		nameTextSize: 'text-[14px]',
		bucketTextSize: 'text-[12px]',
		achieveIconWidth: 14,
		achieveIconHeight: 14,
		profileRightMargin: 'mr-[16px]',
		bucketTitleLeftMargin: 'mr-[6px]',
	},
}
const ReviewFeed = ({ userId, review }: { userId: number; review: IFeed }) => {
	const { userInfo } = useUserInfoQuery(userId)

	const htmlString = review.context!
	
	// HTML 태그 제거 함수
	function stripHtmlTags(html: string) {
			return html.replace(/<[^>]+>/g, '');
	}

	// 일부분만 가져오는 함수
	function truncateHtml(html: string, length: number) {
			const strippedHtml = stripHtmlTags(html);
			return strippedHtml.substring(0, length);
	}

	const truncatedHtml = truncateHtml(htmlString, 50); // 첫 50글자만 가져오기

console.log(truncatedHtml, "변환 됐나?");
	return (
		<Link to={`/review/${review.id}`} className="px-4 py-2 bg-white">
			{/* 작성자 프로필 정보 */}
			<div className="pt-1 pb-2">
				{userInfo && <UserProfile type="detail" userInfo={userInfo} isLoading={false} />}
			</div>
			<div className="flex justify-between">
				<p className="font-semibold text-point1">{review.title}</p>
				<SquareCheck
					className={`inline-block ${fillColorClass[review.color]} ${profileStyle['detail'].achieveIconWidth} ${profileStyle['detail'].achieveIconHeight} `}
				/>
			</div>

			{/* 옵셔널한 정보 (이미지) */}
			{review.images &&
				review.images.map((image) => (
					<img src={image} alt="dummy" className="object-cover w-full h-48 my-2 rounded-md" />
				))}
			<div className="my-2 text-xs text-point1 line-clamp-2">
				{review.context && 
				truncateHtml(htmlString, 100)
				}
			</div>

			{/* 피드 제일 하단 감정 개수, 댓글 개수, 공유 버튼 */}
			<div className="flex items-center justify-between pb-1">
				<div className="flex gap-2">
					<TotalReaction count={review.reactionCount} />
					<TotalComment count={review.commentCount} />
				</div>
				<FiShare size="0.9rem" color="#454645" />
			</div>
		</Link>
	)
}

export default ReviewFeed
