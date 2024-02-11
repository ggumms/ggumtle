import UserProfile from '../../../components/UserProfile/UserProfile'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IBucketDetailInfo, IMenu, IMenuFunc } from '../../../interfaces'
import LocationInfo from './LocationInfo'
import BucketInfo from './BucketInfo'
import InterestTag from './InterestTag'
import ShareButton from '../../../components/ShareButton'
import AchieveDreamButton from './AcheiveDreamButton'
import WriteReviewButton from './WriteReviewButton'
import { useParams } from 'react-router-dom'
import Reaction from './Reaction'
import CommentList from './Comment/CommentList'
import CommentInput from './Comment/CommentInput'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBucketDetailInfo } from './api'

// const userInfo: UserInfoType = {
// 	userId: 1,
// 	userProfileImage: 'url',
// 	userNickname: 'junho',
// 	category: ['인간관계', '여행', '직장'],
// 	bucketId: 2,
// 	bucketTitle: '구독자 100만명 달성하기',
// 	dayCount: 14,
// 	bucketColor: 'mint',
// 	isAchieved: true,
// 	owner: true,
// 	isFollowing: null,
// }

// const bucketInfo: IBucketInfo = {
// 	writerId: 1,
// 	reviewId: 1,
// 	title: '구독자분들과 팬미팅 진행하기',
// 	timeCapsule:
// 		'20만이 되면 얼마나 좋을까.. 나는야 뽀시래기.. 20만이 되어도 초심을 잃지 말고 그때의 감사한 마음을 담아 구독자분들께 그대로 돌려드리자.',
// 	bucketPicture: '/public/dummy.PNG',
// 	color: 'dream green',
// 	reminderDate: 'twoWeeks',
// 	latitude: 23.452,
// 	longitude: 143.213,
// 	address: '용산 파크랜드',
// 	dayCount: 369,
// 	// achievementDate: null,
// 	achievementDate: '2023-01-01',
// 	category: ['취미', '여행', '휴식'],
// 	isPrivate: false,
// 	createdDate: '2023-07-05',
// }

const BucketDetail = () => {
	const [isInputShown, setIsInputShown] = useState(false)
	const [isInputFocused, setIsInputFocused] = useState(false)
	const { goBack } = useRouter()
	const { bucketId } = useParams()

	// bucketId Path variable로 Number 값이 아닌 값이 들어오면 이전 페이지로 이동
	useEffect(() => {
		if (isNaN(Number(bucketId))) {
			goBack()
			return
		}

		return () => {}
	}, [])

	useEffect(() => {
		return () => {}
	}, [])

	// :: Get Bucket & User(writer) data
	const { isLoading, data: bucketDetailInfo } = useQuery<IBucketDetailInfo>({
		queryKey: ['bucketInfo', bucketId],
		queryFn: getBucketDetailInfo,
	})
	console.log('isLoading', isLoading, bucketDetailInfo)

	// :: Header
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = {
		left: icons.BACK,
		center: `${bucketDetailInfo && bucketDetailInfo.userInfo?.userNickname}의 꿈:틀`,
		right: undefined,
	}
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<>
			<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
				{bucketDetailInfo && (
					<BucketInfo
						isLoading={isLoading}
						title={bucketDetailInfo.bucketInfo.title}
						color={bucketDetailInfo.bucketInfo.color}
						dayCount={bucketDetailInfo.bucketInfo.dayCount}
						isPrivate={bucketDetailInfo.bucketInfo.isPrivate}
					/>
				)}
				<UserProfile type="detail" userInfo={bucketDetailInfo?.userInfo} />
				{bucketDetailInfo && (
					<>
						{/* 옵셔널한 정보들 (장소, 사진) */}
						{bucketDetailInfo.bucketInfo.address && <LocationInfo />}
						{bucketDetailInfo.bucketInfo.bucketPicture && (
							<img
								src={bucketDetailInfo.bucketInfo.bucketPicture}
								alt="dummy"
								className="object-cover w-full my-2 rounded-md"
							/>
						)}
						{/* 날짜 */}
						<p className="text-base text-disabled">{bucketDetailInfo.bucketInfo.createdDate}</p>
						{/* 태그 */}
						<ul className="bg-white">
							{bucketDetailInfo.bucketInfo.category.map((category, index) => (
								<InterestTag tag={category} key={`category-${index}`} />
							))}
						</ul>
						<div className="flex gap-3">
							<ShareButton />
							{bucketDetailInfo.bucketInfo.achievementDate === null
								? bucketId && <AchieveDreamButton id={bucketId} />
								: bucketId && <WriteReviewButton id={bucketId} />}
						</div>
						{bucketId && <Reaction id={bucketId} />}
						<CommentList isInputFocused={isInputFocused} setIsInputShown={setIsInputShown} />
					</>
				)}
			</WithHeaderLayout>
			{isInputShown && <CommentInput setIsInputFocused={setIsInputFocused} />}
		</>
	)
}

export default BucketDetail
