import { FiShare } from 'react-icons/fi'
import { SquareCheck } from '../../../../assets/svgs'
import UserProfile, { IProfileStyle } from '../../../../components/UserProfile'
import { fillColorClass } from '../../../../constants/dynamicClass'
import TotalComment from './TotalComment'
import TotalReaction from './TotalReaction'
import { IFeed } from './index'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'

// 하나의 피드 (후기)

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
	// const userInfo: UserInfoType = {
	// 	userId: 1,
	// 	userProfileImage: 'url',
	// 	userNickname: 'junho',
	// 	category: ['인간관계', '여행', '직장'],
	// 	bucketId: 2,
	// 	bucketTitle: '구독자 100만명 달성하기',
	// 	dayCount: 14,
	// 	color: 'mint',
	// 	isAchieved: true,
	// 	owner: true,
	// 	isFollowing: null,
	// }

	// 더미 데이터
	// const photo = true
	// const title = '20만 첫 팬미팅!'
	// const color = 'yellow'
	// const reactionCnt = 29
	// const commentCnt = 94

	return (
		<div className="bg-white px-4 py-2">
			{/* 작성자 프로필 정보 */}
			<div className="pt-1 pb-2">
				{userInfo && <UserProfile type="detail" userInfo={userInfo} />}
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
					<img src={image} alt="dummy" className="w-full h-48 object-cover my-2 rounded-md" />
				))}
			<div className="text-point1 text-xs line-clamp-2 my-2">
				{review.context && review.context}
			</div>

			{/* 피드 제일 하단 감정 개수, 댓글 개수, 공유 버튼 */}
			<div className="flex justify-between items-center pb-1">
				<div className="flex gap-2">
					<TotalReaction count={review.reactionCount} />
					<TotalComment count={review.commentCount} />
				</div>
				<FiShare size="0.9rem" color="#454645" />
			</div>
		</div>
	)
}

export default ReviewFeed
