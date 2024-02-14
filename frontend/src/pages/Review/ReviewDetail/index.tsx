import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

import ReviewMoreButton from '../component/ReviewMoreButton'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import ReviewBucket from '../component/ReviewBucket'
import UserProfile from '../../../components/UserProfile/UserProfile'
import ShareButton from '../component/ShareButton'
import Reaction from '../component/Reaction'
import CommentList from '../component/Comment/CommentList'
import CommentInput from '../component/Comment/CommentInput'
import InterestTag from '../component/InterestTag'

import { useRouter } from '../../../hooks/useRouter'
import { useDetailReviewStore } from '../../../store/detailStore'
import { getReviewDetailQuery } from '../api'

import { IReviewDetail } from '../../../types/bucket'
import { IMenu, IMenuFunc } from '../../../interfaces'
import { icons } from '../../../constants/header-icons'
import EditorViewer from '../component/TextEditor/EditorViewer'
import { useCurrentUserStore } from './../../../store/currentUserStore'

const ReviewDetail = () => {
	const { setDetailReview, resetDetailReview } = useDetailReviewStore()
	const { userInfo } = useCurrentUserStore()
	const [isInputShown, setIsInputShown] = useState(false)
	const [isInputFocused, setIsInputFocused] = useState(false)

	const { goBack } = useRouter()
	const { reviewId } = useParams()

	// :: Validate reviewId
	// reviewId Path variable로 Number 값이 아닌 값이 들어오면 이전 페이지로 이동
	useEffect(() => {
		if (isNaN(Number(reviewId))) {
			goBack()
			return
		}
	}, [])

	// :: Get Review data
	const { isLoading, data: reviewDetailInfo } = useQuery<IReviewDetail>({
		queryKey: ['reviewDetailInfo', reviewId],
		queryFn: getReviewDetailQuery,
	})
	useEffect(() => {
		resetDetailReview()
		reviewDetailInfo && setDetailReview(reviewDetailInfo)
	}, [reviewDetailInfo])

	// :: Header
	const reviewRightMenu =
		reviewDetailInfo && reviewDetailInfo.writer.userId === userInfo?.userId ? (
			<ReviewMoreButton bucketId={reviewDetailInfo.bucketId} />
		) : undefined
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = {
		left: icons.BACK,
		center: `${reviewDetailInfo ? reviewDetailInfo.writer.userNickname + '의 꿈:틀' : '꿈:틀'}`,
		right: reviewRightMenu,
	}
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	// :: Rendering
	if (reviewId === undefined) {
		goBack()
		return
	}
	return (
		<>
			<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
				<p className="text-[28px] font-bold mt-6 leading-none">{reviewDetailInfo?.reviewTitle}</p>
				<div className="mt-6 mb-10">
					<UserProfile type="detail" isLoading={isLoading} userInfo={reviewDetailInfo?.writer} />
				</div>
				<section className="flex flex-col gap-5 px-5">
					<ReviewBucket
						isLoading={isLoading}
						title={reviewDetailInfo?.bucketTitle}
						color={reviewDetailInfo?.bucketColor}
						dayCount={reviewDetailInfo?.daysSinceDream}
						bucketId={reviewDetailInfo?.bucketId}
					/>
					<EditorViewer value={reviewDetailInfo?.reviewContext} />
				</section>

				{isLoading || reviewDetailInfo === undefined ? (
					<>{/* Todo: skeleton 추가 */}</>
				) : (
					<>
						{/* 날짜 */}
						<p className="text-base text-disabled">{reviewDetailInfo.reviewCreatedDate}</p>
						{/* 태그 */}
						<ul className="mt-3 bg-white">
							{reviewDetailInfo.categories.map((category, index) => (
								<InterestTag tag={category} key={`category-${index}`} />
							))}
						</ul>
						<div className="flex gap-3 my-8">
							<ShareButton />
						</div>
						<Reaction id={reviewId} />
						<CommentList
							isInputFocused={isInputFocused}
							setIsInputShown={setIsInputShown}
							id={reviewId}
						/>
					</>
				)}
			</WithHeaderLayout>
			{isInputShown && <CommentInput reviewId={reviewId} setIsInputFocused={setIsInputFocused} />}
		</>
	)
}

export default ReviewDetail
